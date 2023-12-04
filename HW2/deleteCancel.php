<?php

  $id = (int)$_POST['id'];


  // 빈 ㅍ파일인지 체크
  if (filesize("data/mydeletelists.json") == 0) {
    echo json_encode($arr);
    return;
  }

  $file = fopen("data/mydeletelists.json", "r");
  $arr = array();
  
  while(!feof($file)) {
      $txt = fgets($file, filesize("data/mydeletelists.json"));
      if (trim($txt) == "") break;
      $obj = (object)json_decode($txt, true);
      array_push($arr, $obj);
  }
  fclose($file);

  // target구하기
  $target;
  foreach($arr as $key => $value) {
    if ($value->id == $id) {
      $target = $value;
      unset($arr[$key]);
    } 
  }

  // delete json파일에 다시 저장
  // unset하기
  $file = fopen("data/mydeletelists.json", "w");
  foreach($arr as $value) {
    $txt = $value;
    fwrite($file, json_encode($value, JSON_UNESCAPED_UNICODE));
    fwrite($file, "\n");
  }

  // order 구하기 같은 날짜일때의 order 
  // mylist.json읽어서 order구하기

  // 빈 파일인지 체크
  if (filesize("data/mylist.json") == 0) {
    echo json_encode($arr);
    return;
  }
  $file = fopen("data/mylist.json", "r");
  $list = array();

  while(!feof($file)) {
    $txt = fgets($file, filesize("data/mylist.json"));
    if (trim($txt) == "") break;
    $obj = (object)json_decode($txt, true);
    array_push($list, $obj);
  }
  fclose($file);

  // order 
  $order = 0;
  foreach($list as $key => $value) {
    if ($value->date == $target->date) {
      echo $value->date . "\n";
      $order = $value->order+1;
    } 
  }
  $target->order = $order;
  unset($target->delete_time);
  array_push($list, $target);

  // 배열을 다시 json 파일에 저장
  $file = fopen("data/mylist.json", "w");
  foreach($list as $value) {
    $txt = $value;
    fwrite($file, json_encode($value, JSON_UNESCAPED_UNICODE));
    fwrite($file, "\n");
  }
  fclose($file);

  echo json_encode($target);
?>