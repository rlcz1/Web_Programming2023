<?php
  $arr = array();
  if (filesize("../data/mysales.json") != 0) {
    $file = fopen("../data/mysales.json", "r");
    while(!feof($file)) {
      $txt = fgets($file, filesize("../data/mysales.json"));
      if (trim($txt) == "") break;
      $obj = (object)json_decode($txt, true);
      array_push($arr, $obj);
    }
    fclose($file);
  }

  echo json_encode($arr, JSON_UNESCAPED_UNICODE);
?>