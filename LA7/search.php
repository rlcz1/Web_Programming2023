<?php
    $name = "";
    $date = "";

    if (isset($_POST['search_name'])) {
        $name = test_input($_POST['search_name']); 
    }
    if (isset($_POST['search_date'])) {
        $date = test_input($_POST['search_date']); 
    }

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
        if ($txt == "") {
            break;
        }
        $obj = (object)json_decode($txt, true);
        $obj->price = price($obj);
        $obj->total_price = total_price($obj);
        array_push($arr, $obj);
    }
    fclose($file);

    function price($obj) {
        return $obj->milk_num * 4500 + $obj->mando_num * 6900 + $obj->ramen_num * 3500;
    }

    function total_price($obj) {
        $discount = 0;
        $deliver = 2000;
        $total_price = $obj->price;

        if ($obj->rating == "vip") {
            $discount = 0.1;
        } else if ($obj->rating == "gold") {
            $discount = 0.05;
        }

        if ($obj->price >= 10000) {
            $deliver = 0;
        }

        $total_price = $total_price * (1 - $discount);
        return $total_price + $deliver;
    }

    function prt($txt) {
        echo "<pre>";
        echo var_dump($txt);
        echo "</pre>";
    }

    $result = array();
    if ($name != "" && $date != "") {
        $date = date_format(date_create($date), "Y-m-d");
        for ($i = 0; $i < count($arr); $i++) {
            if (($arr[$i]->name == $name) && ($arr[$i]->date >= $date)) {
                array_push($result, $arr[$i]);
            }
        }
    } else if ($name != "" && $date == "") {
        for ($i = 0; $i < count($arr); $i++) {
            if ($arr[$i]->name == $name) {
                array_push($result, $arr[$i]);
            }
        }
    } else if ($date != "" && $name == "") {
        $date = date_format(date_create($date), "Y-m-d");
        for ($i = 0; $i < count($arr); $i++) {
            if ($arr[$i]->date >= $date) {
                array_push($result, $arr[$i]);
            }
        }
    } else if ($name == "" && $date == "") {
        $result = $arr;
    }

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <table>
        <thead>
            <tr>
                <th>이름</th>
                <th>등급</th>
                <th>날짜</th>
                <th>제품구매금액</th>
                <th>최종결제금액</th>
            </tr>
        </thead>
        <tbody>
        <?php 
            foreach($result as $val) {
                    echo "<tr>";
                    echo "<td>" . $val->name . "</td>";
                    echo "<td>" . $val->rating . "</td>";
                    echo "<td>" . $val->date . "</td>";
                    echo "<td>" . $val->price . "</td>";
                    echo "<td>" . $val->total_price . "</td>";
                    echo "</tr>";
                }
            ?>
        </tbody>
    </table>
</body>
</html>