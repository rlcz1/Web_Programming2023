<?php

  $id = $_GET['id'];

  $file = fopen("data/mylist.json", "r");
  $arr = array();

  // 빈 파일인지 체크
  if (filesize("data/mylist.json") == 0) {
    echo json_encode($arr);
    return;
  }

  while(!feof($file)) {
      $txt = fgets($file, filesize("data/mylist.json"));
      if (trim($txt) == "") break;
      $obj = (object)json_decode($txt, true);
      array_push($arr, $obj);
  }
  fclose($file);

  for ($i = 0; $i < count($arr); $i++) {
    if ($arr[$i]->id == $id) {
      echo json_encode($arr[$i]);
    } 
  }

?>