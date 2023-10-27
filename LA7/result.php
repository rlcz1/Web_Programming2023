<?php 
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (empty($_POST['name'])) {
            echo "값을 입력해주세요.";
            exit;
        }
        if (empty($_POST['grade'])) {
            echo "값을 입력해주세요.";
            exit;
        }
        if (empty($_POST['date_month'])) {
            echo "값을 입력해주세요.";
            exit;
        }
        if (empty($_POST['date_day'])) {
            echo "값을 입력해주세요.";
            exit;
        }
    }

    $name = test_input($_POST['name']); 
    $grade = test_input($_POST['grade']); 
    $date_month = test_input($_POST['date_month']); 
    $date_day = test_input($_POST['date_day']);
    $food1 = test_input($_POST['food1']); 
    $food2 = test_input($_POST['food2']); 
    $food3 = test_input($_POST['food3']);


    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    $date = date_create(date("Y") . '-' . $date_month . '-' . $date_day);
    $obj = new stdClass();
    $obj->name = $name;
    $obj->rating = $grade;
    $obj->date = date_format($date, "Y-m-d");
    $obj->milk_num = intval($food1);
    $obj->mando_num = intval($food2);
    $obj->ramen_num = intval($food3);

    $value = json_encode($obj, JSON_UNESCAPED_UNICODE);

    $file = fopen("data.txt", "a");
    $txt = $value . "\n";
    fwrite($file, $txt);
    fclose($file);
    echo "저장되었습니다."
?>
