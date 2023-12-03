<?php
  // echo var_dump($_POST);

  $id = (int)$_POST['id'];
  $targetDate = $_POST['targetDate'];
  $prevDate;

  $target;
  $arr = array();

  $file = fopen("data/mylist.json", "r");
  while(!feof($file)) {
    $txt = fgets($file, filesize("data/mylist.json"));
    if ($txt == "") break;
    $obj = (object)json_decode($txt, true);
    array_push($arr, $obj);
    if ($obj->id == $id) {
      $target = $obj;
      $prevDate = $obj->date;
    }
  }
  fclose($file);

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