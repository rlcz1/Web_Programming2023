<?php
  $productName = $_GET['productName'];

  $arr = array();
  $targetProduct = new stdClass();
  if (filesize("../data/mysales.json") != 0) {
    $file = fopen("../data/mysales.json", "r");
    while(!feof($file)) {
      $txt = fgets($file, filesize("../data/mysales.json"));
      if (trim($txt) == "") break;
      $obj = (object)json_decode($txt, true);
      array_push($arr, $obj);
      if ($obj->productName == $productName) {
        $targetProduct = $obj;
      }
    }
    fclose($file);
  }

  echo json_encode($targetProduct, JSON_UNESCAPED_UNICODE);
?>