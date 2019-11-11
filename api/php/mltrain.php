<?php
require "response.php"; 
require "config.php"; 
require "request.php"; 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers:token");

$header = get_all_headers();
$usertoken = $header['token'];

// 创建连接
$conn = new mysqli($dbhost,$dbuser,$dbpass, $dbname);
$userid = $_GET['userId'];
$sql = "SELECT * FROM model_train  WHERE userid = '".$userid."' ORDER BY id desc LIMIT 5000";
$model = $_GET['modelId'];
try{
    if($model!=''){
        $sql = "SELECT * FROM model_train WHERE modelid='".$model."'  AND userid = '".$userid."' ORDER BY id asc";
    }    
}catch(Exception $e){
    $code = 400;
    $message = "error";
    $data = "error";
    echo $response -> json($code,$message,$data);
}
$result = $conn->query($sql);
$response = new Response;

$output = array();
$res = array();
$data = array();
if ($result->num_rows > 0) {
    $code = 200;
    $message = "success";
    
    // 输出数据
    while($row = $result->fetch_assoc()) {
        $data['id'] = $row['id'];
        $data['modelid'] = $row['modelid'];
        $data['epoch'] = $row['epoch'];
        $data['loss'] = $row['loss'];
        $data['acc'] = $row['acc'];
        array_push($res, $data);
    }
    echo $response -> json($code,$message,$res);
} else {
    $code = 200;
    $message = "success";
    echo $response -> json($code,$message,$res);
}
$conn->close();
?>