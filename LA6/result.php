<?php 

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (empty($_POST['name'])) {
            echo "값을 입력해주세요.";
            exit;
        }
        if (empty($_POST['value'])) {
            echo "값을 입력해주세요.";
            exit;
        }
    }

    $name = test_input($_POST['name']); 
    $value = test_input($_POST['value']); 

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    $file = fopen("data.txt", "a");
    $txt = $name . "|" . $value . "\n";
    fwrite($file, $txt);
    fclose($file);
    echo "저장되었습니다."
?>