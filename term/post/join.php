<?php
    session_start();

    $id = $_POST['id'];
    $password = $_POST['password'];
    $name = $_POST['name'];

    $result = new stdClass();
    $result->userId = $id;
    $result->password = $password;
    $result->name = $name;
    $result->friends = array();

    $value = json_encode($result, JSON_UNESCAPED_UNICODE);

    $fileName = "../datas/user.json";
    $file = fopen($fileName, "a");
    $txt = $value . "\n";
    fwrite($file, $txt);
    fclose($file);

    echo "<script> alert('회원가입 성공'); location.href='../index.php'; </script>";

?>