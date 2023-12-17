<?php
    $userId = "temp";
    $subject = $_GET['subject'];
    $subject_no = $_GET['subject_no'];

    $arr = array();
    $fileName = "../datas/study.json";
    $times = array();
    if (filesize($fileName) != 0) {
        $file = fopen($fileName, "r");
        while(!feof($file)) {
            $txt = fgets($file, filesize($fileName));
            if (trim($txt) == "") break;
            $obj = (object)json_decode($txt, true);
            if ($obj->userId == $userId && $obj->subject_no == $subject_no) {
                $times = $obj->times;
            }
        }
    }

    echo json_encode($times);
?>