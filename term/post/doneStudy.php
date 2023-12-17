<?php
    $time = (int)$_POST['time'];
    $userId = "temp";
    $subject = $_POST['subject'];
    $subject_no = $_POST['subject_no'];
    $dclass = $_POST['dclass'];
    $college = $_POST['college'];

    // 해당 과목을 처음 공부했을 경우
    $arr = array();
    $fileName = "../datas/study.json";
    $flag = false;
    $targetSubject = new stdClass();
    if (filesize($fileName) != 0) {
        $file = fopen($fileName, "r");
        while(!feof($file)) {
            $txt = fgets($file, filesize($fileName));
            if (trim($txt) == "") break;
            $obj = (object)json_decode($txt, true);
            array_push($arr, $obj);

             // target subject구하기
            if ($obj->userId == $userId && $obj->subject_no == $subject_no) {
                $targetSubject = $obj;
                $flag = true;
            }
        }
        fclose($file);
      }

    $date_time = new stdClass();
    // $date_time->date = "2023-12-25";
    $date_time->date = date("Y-m-d");
    $date_time->time = $time;
    if (!$flag) {
        $targetSubject->userId = $userId;
        $targetSubject->subject_no = $subject_no;
        $targetSubject->subject = $subject;
        $targetSubject->college = $college;
        $targetSubject->dclass = $dclass;
        $targetSubject->time = $time;
        $targetSubject->times = array($date_time);
        array_push($arr, $targetSubject);
    } else {
        // array를 돌면서 해당 과목을 공부한 날짜가 오늘과 같으면 갱신
        $date_flag = false;
        for ($i = 0; $i < count($targetSubject->times); $i++) {
            if ($targetSubject->times[$i]['date'] == $date_time->date) {
                $targetSubject->times[$i]['time'] += $date_time->time;
                $date_flag = true;
                break;
            }
        }

        if (!$date_flag) {
            //arr에 새로운 date_time을 추가
            array_push($targetSubject->times, $date_time);
        }

        $targetSubject->time += $time;

        // arr에 targetsubect 갱신
        foreach($arr as $key => $value) {
            if ($value->userId == $userId && $value->subject_no == $subject_no) {
                $arr[$key] = $targetSubject;
                break;
            }
        }
    }

    $file = fopen($fileName, "w");
    foreach($arr as $value) {
        $txt = $value;
        fwrite($file, json_encode($value, JSON_UNESCAPED_UNICODE));
        fwrite($file, "\n");
    }
    fclose($file);

    function prt($arr) {
        echo "<pre>";
        var_dump($arr);
        echo "</pre>";
    }
?>