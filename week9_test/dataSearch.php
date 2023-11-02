<?php 

    session_start();

    if (!isset($_SESSION['datas'])) {
        $_SESSION['datas'] = array();
    }
    $datas = $_SESSION['datas'];
    $name = $_POST['name'];
    $grade = $_POST['grade'];

    $result = array();

    if ($name == "" && $grade == "") {
        $result = $datas;
    }else if ($name != "" && $grade != "") {
        foreach ($datas as $data) {
            foreach ($data as $value) {
                if (strpos($value['name'], $name) !== false && $value['grade'] == $grade) {
                    $result[] = $data;
                }
            }
        }
    }
    if ($name != "" && $grade == "") {
        foreach ($datas as $data) {
            foreach ($data as $value) {
                if (strpos($value['name'], $name) !== false) {
                    $result[] = $data;
                }
            }
        }
    }

    if ($grade != "" && $name == "") {
        foreach ($datas as $data) {
            foreach ($data as $value) {
                if ($value['grade'] == $grade) {
                    $result[] = $data;
                }
            }
        }
    }

    function prt($txt) {
        echo "<pre>";
        echo var_dump($txt);
        echo "</pre>";
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
                <th>학년</th>
            </tr>
        </thead>
        <tbody>
        <?php 

            foreach($result as $val) {
                    foreach ($val as $value) {
                        echo "<tr>";
                        echo "<td>" . $value['name'] . "</td>";
                        echo "<td>" . $value['grade'] . "</td>";
                        echo "</tr>";
                    }
                }
            ?>
        </tbody>
    </table>
</body>
</html>