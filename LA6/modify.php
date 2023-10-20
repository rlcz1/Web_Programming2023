<?php 
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        if (empty($_GET['current'])) {
            echo "값을 입력해주세요.";
            exit;
        }
        if (empty($_GET['update'])) {
            echo "값을 입력해주세요.";
            exit;
        }
    }

    $current = test_input($_GET['current']); 
    $update = test_input($_GET['update']); 

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

    for ($i = 0; $i < $cnt; $i++) {
        if ($arr[$i][1] == $current) {
            array_push($result, $arr[$i]);
            $arr[$i][1] = $update;
        }
    }

    $file = fopen("data.txt", "w");

    foreach($arr as $value) {
        $txt = $value[0] . "|" . $value[1];
        fwrite($file, $txt);
    }
    fwrite($file, "\n");
    fclose($file);

    if ($result != null) {
        foreach($result as $value) {
            echo $value[0] .  "의 키" . $value[1] . "cm 정보가 수정되었습니다.\n";
            echo "수정 후 키 : " . $update;
        }
    }

?>