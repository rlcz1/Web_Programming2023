<?php
  // echo var_dump($_POST);

  $arr = array();

  $file = fopen("data/mylist.json", "r");
  while(!feof($file)) {
    $txt = fgets($file, filesize("data/mylist.json"));
    if ($txt == "") break;
    $obj = (object)json_decode($txt, true);
    array_push($arr, $obj);
  }
  fclose($file);

  echo (int)$_POST['id'];
  foreach($arr as $value) {
    if ($value->id == (int)$_POST["id"]) {
      // echo var_dump($value);
      $value->title = $_POST["title"];
      $value->description = $_POST["content"];
      $value->type = $_POST["type"];
      $value->file_name = $_FILES['file']['name'];

      // 이미지 업로드
      if($_FILES['file']['size'] > 0) {
        $file_tmp_name = $_FILES['file']['tmp_name'];
        $save_filename = $_SERVER['DOCUMENT_ROOT'] . "/images/" . $_FILES['file']['name'];
    
        $file_upload	= move_uploaded_file($file_tmp_name, $save_filename);
      }
    }
  }

  $file = fopen("data/mylist.json", "w");
  foreach($arr as $value) {
    $txt = $value;
    fwrite($file, json_encode($value, JSON_UNESCAPED_UNICODE));
    fwrite($file, "\n");
  }
  // fwrite($file, "\n");
  fclose($file);

  // echo var_dump($arr);

  // foreach($arr as $value) {
  //     $txt = $value[0] . "|" . $value[1];
  //     fwrite($file, $txt);
  // }
  // fclose($file);
?>