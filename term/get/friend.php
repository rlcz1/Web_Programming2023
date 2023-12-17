<?php
    session_start();
    $userId = $_SESSION['user']->userId;

    $arr = array();
    $fileName = "../datas/user.json";
    $friends = new stdClass();
    if (filesize($fileName) != 0) {
        $file = fopen($fileName, "r");
        while(!feof($file)) {
            $txt = fgets($file, filesize($fileName));
            if (trim($txt) == "") break;
            $obj = (object)json_decode($txt, true);
            array_push($arr, $obj);

            // target friend구하기
            if ($obj->userId == $userId) {
                $friends = $obj->friends;
            }
        }
        fclose($file);
    }

    // 친구정보 구하기
    $friend_list = array();
    foreach($arr as $value) {
        foreach($friends as $friendId) {
            if ($value->userId == $friendId) {
                array_push($friend_list, $value);
            }
        }
    }

    // 공부정보 구하기
    $fileName = "../datas/study.json";
    $study = array();
    if (filesize($fileName) != 0) {
        $file = fopen($fileName, "r");
        while(!feof($file)) {
            $txt = fgets($file, filesize($fileName));
            if (trim($txt) == "") break;
            $obj = (object)json_decode($txt, true);
            array_push($study, $obj);
        }
        fclose($file);
    }

    // 친구별 공부시간 구하기
    foreach($friend_list as $friend) {
        $friend->userId = $friendId;
        $friend->time = 0;
        foreach($study as $value) {
            if ($value->userId == $friendId) {
                $friend->time += $value->time;
            }
        }
    }

    echo json_encode($friend_list, JSON_UNESCAPED_UNICODE);
?>