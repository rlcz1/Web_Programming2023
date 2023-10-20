<?php 
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        if (empty($_GET['val'])) {
            echo "값을 입력해주세요.";
            exit;
        }
        if (empty($_GET['radio'])) {
            echo "값을 입력해주세요.";
            exit;
        }
    }

    $val = test_input($_GET['val']); 
    $radio = test_input($_GET['radio']); 

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    $file = fopen("data.txt", "r");
    $arr = array();
    while(!feof($file)) {
        $txt = fgets($file, filesize("data.txt"));
        $tmp = explode("|", $txt);
        if ($tmp[0] == "") {
            break;
        }
        array_push($arr, array($tmp[0], $tmp[1]));
    }
    fclose($file);

    $result = array();
    $cnt = count($arr);
    if ($radio == "name") {
        for ($i = 0; $i < $cnt; $i++) {
            if ($arr[$i][0] == $val) {
                array_push($result, $arr[$i]);
                unset($arr[$i]);
            }
        }
    } else {
        for ($i = 0; $i < $cnt; $i++) {
            if ($arr[$i][1] < $val) {
                array_push($result, $arr[$i]);
                unset($arr[$i]);
            }
        }
    }

    $arr = array_values($arr);

    $file = fopen("data.txt", "w");

    foreach($arr as $value) {
        $txt = $value[0] . "|" . $value[1];
        fwrite($file, $txt);
    }
    fclose($file);

    if ($result != null) {
        foreach($result as $value) {
            echo $value[1] .  " cm 인" . $value[0] . "의 정보가 삭제되었습니다.";
        }
    }

?>