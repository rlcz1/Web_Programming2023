<?php
// https://m.blog.naver.com/snsprofessor/221984341780 참고
$ch = curl_init();

$url = 'https://api.cnu.ac.kr/svc/offcam/pub/FoodInfo?page=1&AUTH_KEY=F00523C2E4D44F85A3FA1F68CBC88D04A302866E';

curl_setopt($ch, CURLOPT_URL, $url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

$response = curl_exec($ch);

curl_close($ch);

$data = json_decode($response);

echo var_dump($data);
?>