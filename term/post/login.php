<?php
    session_start();

    $id = $_POST['id'];
    $password = $_POST['password'];

    $fileName = "../datas/user.json";
    $arr = array();
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

    // arr돌면서 id와 password가 일치하는지 확인
    $flag = false;
    $user = new stdClass();
    for ($i = 0; $i < count($arr); $i++) {
        if ($arr[$i]->userId == $id && $arr[$i]->password == $password) {
            $user = $arr[$i];
            $flag = true;
            break;
        }
    }

    if ($flag) {
        $_SESSION['user'] = $user;
        echo "<script> alert('로그인 성공'); location.href='../index.php'; </script>";
    } else {
        echo "<script> alert('로그인 실패'); history.back(); </script> ";
    }

?>