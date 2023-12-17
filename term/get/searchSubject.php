<?php

    $search = isset($_GET['search']) ? $_GET['search'] : "";

    $arr = array();
    $fileName = "../datas/subject.json";

    $arr = array();
    echo filesize($fileName);
    if (filesize($fileName) != 0) {
        $file = fopen($fileName, "r");
        while(!feof($file)) {
            $txt = fgets($file, filesize($fileName));
            if (trim($txt) == "") break;
            $obj = (object)json_decode($txt, true);
            array_push($arr, $obj);
        }
        fclose($file);
    }
    var_dump($arr);


    $result = array();
    for ($i = 0; $i < count($arr); $i++) {
        if (strpos($arr[$i]->OPEN_SBJT_NM, $search) !== false) {
            array_push($result, $arr[$i]);
        }
    }

    echo json_encode($result);
?>