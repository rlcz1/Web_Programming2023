<?php
    session_start();
    $userId = $_SESSION['user']->userId;
    $friendId = $_POST['friendId'];

    $fileName = "../datas/user.json";
    $user = new stdClass();
    $friend = new stdClass();
    $flag = false;
    $arr = array();
    if (filesize($fileName) != 0) {
        $file = fopen($fileName, "r");
        while(!feof($file)) {
            $txt = fgets($file, filesize($fileName));
            if (trim($txt) == "") break;
            $obj = (object)json_decode($txt, true);
            array_push($arr, $obj);

             // target subject구하기
            if ($obj->userId == $friendId) {
                $friend = $obj;
                $flag = true;
            }
            if ($obj->userId == $userId) {
                $user = $obj;
            }
        }
        fclose($file);
    }

    if (!$flag) {
        echo "<script>alert('존재하지 않는 아이디입니다.'); history.back();</script>";
    } else {
        // 이미 친구인지 확인
        for ($i = 0; $i < count($user->friends); $i++) {
            if ($user->friends[$i] == $friendId) {
                echo "<script>alert('이미 친구입니다.'); history.back();</script>";
                break;
                return false;
            }
        }
        array_push($user->friends, $friendId);

        foreach($arr as $value) {
            if ($value->userId == $userId) {
                $value = $user;
            }
        }

        $file = fopen($fileName, "w");
        foreach($arr as $value) {
            $txt = $value;
            fwrite($file, json_encode($value, JSON_UNESCAPED_UNICODE));
            fwrite($file, "\n");
        }
        fclose($file);
        echo "<script>alert('친구 추가 완료'); location.href='../pages/friend.php';</script>";
    }


    var_dump($user);
?>