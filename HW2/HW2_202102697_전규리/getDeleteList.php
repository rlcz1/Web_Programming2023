<?php
  $file = fopen("data/mydeletelists.json", "r");
  $arr = array();

  // 빈 파일인지 체크
  if (filesize("data/mydeletelists.json") == 0) {
    echo json_encode($arr);
    return;
  }

  while(!feof($file)) {
    $txt = fgets($file, filesize("data/mydeletelists.json"));
    if (trim($txt) == "") break;

    $obj = (object)json_decode($txt, true);
    array_push($arr, $obj);
  }
  fclose($file);

  echo json_encode($arr);
?>