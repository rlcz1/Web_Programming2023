<?php

  $month = $_GET['month'];
  $date = $_GET['date'];

  $file = fopen("data/mylist.json", "r");
  $arr = array();

  while(!feof($file)) {
      $txt = fgets($file, filesize("data/mylist.json"));
      if ($txt == "") break;
      $obj = (object)json_decode($txt, true);
      array_push($arr, $obj);
  }
  fclose($file);

  $result = array();

  for ($i = 0; $i < count($arr); $i++) {
    if ((substr($arr[$i]->date, 5, 2) == $month) && (substr($arr[$i]->date, 8, 2) == $date)) {
      array_push($result, $arr[$i]);
    } 
  }

  echo json_encode($result);

?>