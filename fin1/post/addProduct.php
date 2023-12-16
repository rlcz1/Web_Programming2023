<?php
  $arr = array();

  $productName = $_POST['productName'];
  $targetProduct = new stdClass();
  $flag = false;
  if (filesize("../data/mysales.json") != 0) {
   $file = fopen("../data/mysales.json", "r");
   while(!feof($file)) {
       $txt = fgets($file, filesize("../data/mysales.json"));
       if (trim($txt) == "") break;
       $obj = (object)json_decode($txt, true);
        array_push($arr, $obj);
        // target Product구하기
       if ($obj->productName == $productName) {
        $targetProduct = $obj;
        $flag = true;
       }
   }
   fclose($file);
 }

  $newProduct = new stdClass();
  //없으면 새로 생성해서 작성
  if ($flag == false) {
    $newProduct->productName = $productName;
    $newProduct->productPrice = $_POST['productPrice'];
    $newProduct->salesData = array();

    $salesDataObj = new stdClass();
    $salesDataObj->date = $_POST['date'];
    $salesDataObj->sales = (int)$_POST['sales'];
    $salesDataObj->inventory = (int)$_POST['inventory'];
    $salesDataObj->restocked = (int)$_POST['restocked'];

    array_push($newProduct->salesData, $salesDataObj);
    array_push($arr, $newProduct);
  } else {
    foreach ($arr as $key => $value) {
      if ($value->productName == $targetProduct->productName) {
        $salesDataObj = new stdClass();
        $salesDataObj->date = $_POST['date'];
        $salesDataObj->sales = (int)$_POST['sales'];
        $salesDataObj->inventory = (int)$_POST['inventory'];
        $salesDataObj->restocked = (int)$_POST['restocked'];
        array_push($value->salesData, $salesDataObj);
        break;
      }
    }
  }

  $file = fopen("../data/mysales.json", "w");
  foreach($arr as $value) {
    $txt = $value;
    fwrite($file, json_encode($value, JSON_UNESCAPED_UNICODE));
    fwrite($file, "\n");
  }
  fclose($file);

  echo "저장되었습니다.";

  function prt($arr) {
    echo "<pre>";
    var_dump($arr);
    echo "</pre>";
  }


  // json데이터 생성
  // $obj = new stdClass();
  // $obj->productName = $_POST['productName'];
  // $obj->productPrice = $_POST['productPrice'];
  // $obj->salesData = array();


?>