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
    if ($radio == "name") {
        for ($i = 0; $i < count($arr); $i++) {
            if (strpos($arr[$i][0], $val) !== false) {
                array_push($result, $arr[$i]);
            }
        }
    } else {
        for ($i = 0; $i < count($arr); $i++) {
            if ($arr[$i][1] >= $val) {
                array_push($result, $arr[$i]);
            }
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>목요실습3</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <table>
        <thead>
            <tr>
                <th>이름</th>
                <th>키</th>
            </tr>
        </thead>
        <tbody>
            <?php 
                foreach($result as $val) {
                    echo "<tr>";
                    echo "<td>" . $val[0] . "</td>";
                    echo "<td>" . $val[1] . "</td>";
                    echo "</tr>";
                }
            ?>
        </tbody>
    </table>
</body>
</html>