<?php
  $id = (int)$_POST['id'];
  $targetId = (int)$_POST['targetId'];

  $prevDate;
  $targetDate;

  $item;

  $arr = array();

  $file = fopen("data/mylist.json", "r");
  while(!feof($file)) {
    $txt = fgets($file, filesize("data/mylist.json"));
    if ($txt == "") break;
    $obj = (object)json_decode($txt, true);
    array_push($arr, $obj);
    if ($obj->id == $id) {
      $item = $obj;
      $prevDate = $obj->date;
    } 
  }
  fclose($file);

  foreach($arr as $value) {
    if ($value->id == $targetId) {
      $item->date = $value->date;
      $item->order = $value->order + 1;
    }
  }

  // prev Date order 재정렬
  foreach($arr as $value) {
    if ($value->date == $prevDate) {
      if ($value->order > $item->order) {
        $value->order--;
      }
    }
  }

  // target Date order 재정렬
  foreach($arr as $value) {
    if ($value->date == $item->date && $value->id != $item->id) {
      if ($value->order >= $item->order) {
        $value->order++;
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