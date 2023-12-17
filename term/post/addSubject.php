<?php
    $userId = "temp";
    $subject = $_POST['subject'];
    $dclass = $_POST['dclass'];
    $prof = $_POST['prof'];
    $subject_no = $_POST['subject_no'];
    $college = $_POST['college'];

    $arr = array();
    $fileName = "../datas/userSubject.json";

    $obj = new stdClass();
    $obj->userId = $userId;
    $obj->subject = $subject;
    $obj->dclass = $dclass;
    $obj->prof = $prof;
    $obj->subject_no = $subject_no;
    $obj->college = $college;
    
    $value = json_encode($obj, JSON_UNESCAPED_UNICODE);

    // 이미 수강중인 과목인지 체크
    $flag = false;
    if (filesize($fileName) != 0) {
        $file = fopen($fileName, "r");
        while(!feof($file)) {
            $txt = fgets($file, filesize($fileName));
            if (trim($txt) == "") break;
            $obj = (object)json_decode($txt, true);
            if ($obj->userId == $userId && $obj->subject_no == $subject_no) {
                $flag = true;
                echo "이미 수강중인 과목입니다.";
            }
        }
    }

    if (!$flag) {
        $file = fopen($fileName, "a");
        $txt = $value . "\n";
        fwrite($file, $txt);
        fclose($file);
        echo "과목이 추가되었습니다.";
    }

?>