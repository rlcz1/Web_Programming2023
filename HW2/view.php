<?php

  $id = $_GET['id'];

  $file = fopen("data/mylist.json", "r");
  $arr = array();

  while(!feof($file)) {
      $txt = fgets($file, filesize("data/mylist.json"));
      if ($txt == "") break;
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