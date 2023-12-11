<?php
  $id = $_POST['id'];

  $arr = array();

  // 빈 파일인지 체크
  if (filesize("data/mylist.json") == 0) {
    echo json_encode($arr);
    return;
  }
  $file = fopen("data/mylist.json", "r");
  while(!feof($file)) {
      $txt = fgets($file, filesize("data/mylist.json"));
      if (trim($txt) == "") break;
      $obj = (object)json_decode($txt, true);
      array_push($arr, $obj);
  }
  fclose($file);

  $result;

  // id가 일치하는 객체를 배열에서 제거
  foreach($arr as $key => $value) {
    if ($value->id == $id) {
      $result = $value;
      unset($arr[$key]);
    } 
  }

  // 날짜에 맞는 아이템의 order수정
  foreach($arr as $key => $value) {
    if ($value->date == $result->date) {
      if ($value->order > $result->order) {
        $value->order--;
      }
    }
  }

  // 배열을 다시 json 파일에 저장
  $file = fopen("data/mylist.json", "w");
  foreach($arr as $value) {
    $txt = $value;
    fwrite($file, json_encode($value, JSON_UNESCAPED_UNICODE));
    fwrite($file, "\n");
  }
  fclose($file);

  date_default_timezone_set('Asia/Seoul');
  $result->delete_time = date("Y-m-d H:i:sa");
  //order없애기
  unset($result->order);

  // json데이터 저장
  $value = json_encode($result, JSON_UNESCAPED_UNICODE);

  $file = fopen("data/mydeletelists.json", "a");
  $txt = $value . "\n";
  fwrite($file, $txt);
  fclose($file);

  echo json_encode($result);


?>