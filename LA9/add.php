<?php 
    $name = strtolower($_POST['name']);
    $dept = strtolower($_POST['dept']);

    $obj = new stdClass();
    $obj->dept = $dept;
    $obj->name = $name;

    $value = json_encode($obj, JSON_UNESCAPED_UNICODE);

    $file = fopen("data.json", "a");
    $txt = $value . "\n";
    fwrite($file, $txt);
    fclose($file);

    echo json_encode($obj);

?>