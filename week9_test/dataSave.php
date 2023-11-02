<?php 
    session_start();

    $name = $_POST['name'];
    $grade = $_POST['grade'];

    if (!isset($_SESSION['datas'])) {
        $_SESSION['datas'] = array();
    }
    $datas = $_SESSION['datas'];
    $arr[] = array('name'=>$name, 'grade'=>$grade);
    array_push($datas, $arr);

    $_SESSION['datas'] = $datas;

    echo "세션에 저장되었습니다.";
?>