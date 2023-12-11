<?php

  // id 구하기
  $id = 0;
   // 빈 파일인지 체크
   if (filesize("data/mylist.json") != 0) {
    $file = fopen("data/mylist.json", "r");
    while(!feof($file)) {
        $txt = fgets($file, filesize("data/mylist.json"));
        if (trim($txt) == "") break;
        $obj = (object)json_decode($txt, true);
        $id = max($id, $obj->id);
    }
    fclose($file);
  }

  $id++;

  // date
  $month = ($_POST['month']) < 10 ? '0' . $_POST['month'] : $_POST['month'];
  $day = ($_POST['date']) < 10 ? '0' . $_POST['date'] : $_POST['date'];
  $date = '2023' . '-' . $month . '-' . $day;

  //order 구하기
  $order = 1;
  // 빈 파일인지 체크
  if (filesize("data/mylist.json") != 0) {
    $file = fopen("data/mylist.json", "r");
    while(!feof($file)) {
        $txt = fgets($file, filesize("data/mylist.json"));
        if (trim($txt) == "") break;
        $obj = (object)json_decode($txt, true);
        if ($obj->date == $date) {
          $order = $obj->order + 1;
        }
    }
  }


  // json데이터 생성
  $obj = new stdClass();
  $obj->id = $id;
  $obj->date = $date;
  $obj->order = $order;
  $obj->title = $_POST['title'];
  $obj->description = $_POST['content'];
  $obj->category = $_POST['type'];
  $obj->file_name = $_FILES['file']['name'];

  // 이미지 업로드
  if($_FILES['file']['size'] > 0) {
		$file_tmp_name = $_FILES['file']['tmp_name'];
		$save_filename = $_SERVER['DOCUMENT_ROOT'] . "/images/" . $_FILES['file']['name'];

		$file_upload	= move_uploaded_file($file_tmp_name, $save_filename);
	}

  // json데이터 저장
  $value = json_encode($obj, JSON_UNESCAPED_UNICODE);

  $file = fopen("data/mylist.json", "a");
  $txt = $value . "\n";
  fwrite($file, $txt);
  fclose($file);

  echo json_encode($obj);
?>