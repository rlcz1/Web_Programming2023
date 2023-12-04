<?php
  // echo var_dump($_POST);

  $id = (int)$_POST['id'];
  $targetDate = $_POST['targetDate'];
  $dateFlag = $_POST['dateFlag'];

  $prevDate;

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
      $target = $obj;
      $prevDate = $obj->date;
    }
  }
  fclose($file);

  if ($dateFlag == "true") {
    // 타겟의 order를 맨 마지막으로 설정
    $order = 0;
    foreach($arr as $value) {
      if ($value->date == $targetDate) {
        if ($value->order > $order) {
          $order = $value->order;
        }
      }
    }

    // 타겟 이전의 order를 재정렬, 타겟의 order를 맨 마지막으로 설정
    foreach($arr as $value) {
      if ($value->date == $prevDate) {
        if ($value->order > $target->order) {
          $value->order--;
        }
      }
    }

    foreach($arr as $value) {
      if ($value->id == $id) {
        $value->order = $order;
        echo "order : " . $value->order . "\n";
      }
    }
  } else {
    // prev Date order 재정렬
    foreach($arr as $value) {
      if ($value->date == $prevDate) {
        if ($value->order > $target->order) {
          $value->order--;
        }
      }
    }

    // target Date order 구하기
    $order = 1;
    foreach($arr as $value) {
      if ($value->date == $targetDate) {
        $order = $value->order + 1;
      }
    }

    // target Date order 설정
    foreach($arr as $value) {
      if ($value->id == $id) {
        $value->date = $targetDate;
        $value->order = $order;
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

  // echo var_dump(json_encode($arr, JSON_UNESCAPED_UNICODE));
?>