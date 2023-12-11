<?php
  $id = (int)$_POST['id'];
  $targetId = (int)$_POST['targetId'];

  $item;
  $target;

  $arr = array();

  // 빈 파일인지 체크
  if (filesize("data/mylist.json") == 0) {
    echo json_encode($arr);
    return;
  }

  $file = fopen("data/mylist.json", "r");
  while(!feof($file)) {
    $txt = fgets($file, filesize("data/mylist.json"));
    if (trim($txt) == "") break;
    $obj = (object)json_decode($txt, true);
    array_push($arr, $obj);
    if ($obj->id == $id) {
      $item = $obj;
    } else if ($obj->id == $targetId) {
      $target = $obj;
    }
  }
  fclose($file);


  // target의 order가 더 작을때.
  if ($item->order > $target->order) {
    foreach ($arr as $value) {
      // value->order < item->order && value->order > target->order일때 order를 1씩 증가시킨다.
      if ($value->date == $item->date && $value->order < $item->order && $value->order >= $target->order) {
        $value->order++;
      }
    }
    // item저장
    foreach ($arr as $value) {
      if ($value->id == $id) {
        $value->order = $target->order-1;
      }
    }
  } else { // target의 order가 더 클때.
    foreach ($arr as $value) {
      // value->order > item->order && value->order <= target->order일때 order를 1씩 감소시킨다.
      if ($value->date == $item->date && $value->order > $item->order && $value->order <= $target->order) {
        $value->order--;
      }
    }
    // item저장
    foreach ($arr as $value) {
      if ($value->id == $id) {
        $value->order = $target->order+1;
      }
    }

  }

  // 각 날짜별 order순으로 정렬
  usort($arr, function ($a, $b) {
    if ($a->date == $b->date) {
        return ($a->order > $b->order) ? 1 : -1;
    }
    return ($a->date > $b->date) ? 1 : -1;
  });

  $file = fopen("data/mylist.json", "w");
  foreach($arr as $value) {
    $txt = $value;
    fwrite($file, json_encode($value, JSON_UNESCAPED_UNICODE));
    fwrite($file, "\n");
  }
  fclose($file);


  echo var_dump($arr);

?>