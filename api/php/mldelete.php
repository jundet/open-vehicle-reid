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
$conn->autocommit(FALSE);
$sql1 = "";
$sql2 = "";
$sql3 = "";
try{
    $userid = $_GET['userId'];
    $model = $_GET['modelId'];
    if($model!=''){
        $sql1 = "DELETE FROM models WHERE userid = '".$userid."' AND id = '".$model."'";
        $sql2 = "DELETE FROM model_test WHERE userid = '".$userid."' AND modelid='".$model."'";
        $sql3 = "DELETE FROM model_train WHERE userid = '".$userid."' AND modelid='".$model."'";
    }
    $result1 = $conn->query($sql1);
    $result2 = $conn->query($sql2);
    $result3 = $conn->query($sql3);
    $response = new Response;

    $output = array();
    $res = array();
    $data = array();
    if ($result1&&$result2&&$result3) {
        $code = 200;
        $message = "success";
        $conn->commit(); 
        echo $response -> json($code,$message,$res);
    } else {
        $code = 400;
        $message = "error";
        $conn->rollback();
        echo $response -> json($code,$message,$res);
    }
    $conn->autocommit(TRUE);
    $conn->close();
}catch(Exception $e){
    $conn->autocommit(TRUE);
    $conn->close();
    $code = 400;
    $message = "error";
    $data = "error";
    echo $response -> json($code,$message,$data);
}
?>