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
try{
    $model = $_GET['modelName'];
    $modeldata = $_GET['dataset'];
    $userid = $_GET['userid'];
    $sql = "SELECT * FROM models WHERE userid = '".$userid."' ORDER BY id desc LIMIT 5000";
    if($model!=''){
        $sql = "SELECT * FROM models WHERE model LIKE '%$model%' AND userid = '".$userid."' ORDER BY id asc";
    }
    if($modeldata!='all'){
        $sql = "SELECT * FROM models WHERE data='".$modeldata."'  AND userid = '".$userid."' ORDER BY id asc";
    }
    if($model!='' && $modeldata!='all'){
        $sql = "SELECT * FROM models WHERE model LIKE '%$model%' AND data='".$modeldata."' AND userid = '".$userid."'  ORDER BY id asc";
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
        $data['model'] = $row['model'];
        $data['learnrate'] = $row['learnrate'];
        $data['stepsize'] = $row['stepsize'];
        $data['gamma'] = $row['gamma'];
        $data['loss'] = $row['loss'];
        $data['data'] = $row['data'];
        $data['height'] = $row['height'];
        $data['width'] = $row['width'];
        $data['seqlen'] = $row['seqlen'];
        $data['batch'] = $row['batch'];
        $data['rank1'] = $row['rank1'];
        $data['other'] = $row['other'];
        $data['time'] = $row['time'];
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