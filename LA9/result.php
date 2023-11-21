<?php 
    $value = strtolower($_GET['value']);
    $option = $_GET['option'];

    $file = fopen("data.json", "r");
    $arr = array();

    while(!feof($file)) {
        $txt = fgets($file, filesize("data.json"));
        if ($txt == "") break;
        $obj = (object)json_decode($txt, true);
        $obj->name = strtolower($obj->name);
        array_push($arr, $obj);
    }
    fclose($file);

    $result = array();

    if ($option == "name") {
        for ($i = 0; $i < count($arr); $i++) {
            if (strpos($arr[$i]->name, $value) !== false) {
                array_push($result, $arr[$i]);
            }
        }
    } else {
        for ($i = 0; $i < count($arr); $i++) {
            if (strpos($arr[$i]->dept, $value) !== false) {
                array_push($result, $arr[$i]);
            }
        }
    }

    echo json_encode($result);
?>