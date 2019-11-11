<?php
require "response.php"; 
require "config.php"; 


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

function settoken()
{
    $str = md5(uniqid(md5(microtime(true)),true));  
    $str = sha1($str);  
    return $str;
}

// 创建连接
$conn = new mysqli($dbhost,$dbuser,$dbpass, $dbname);
try{
    $name = $_GET['userName'];
    $password = $_GET['password'];
    if($name!=''){
        $sql = "SELECT * FROM user WHERE name='".$name."'";
    }
}catch(Exception $e){
    $code = 400;
    $message = "error";
    $data = "";
    echo $response -> json($code,$message,$data);
}

$result = $conn->query($sql);
$row = $result->fetch_assoc();

if($row['password']==$password){
    $token = settoken();
    if($name=='Guest')
    {
        $token = 'guestoken';
    }
    
    $sql = "UPDATE user SET token='".$token."' WHERE name='".$name."'";
    $response = new Response;
    $result = $conn->query($sql);
    $output = array();
    $data = array();
    if ($result) {
        $code = 200;
        $message = "success";
        $data['token'] = $token;
        $data['id'] = $row['id'];
        echo $response -> json($code,$message,$data);
    } else {
        $code = 400;
        $message = "error";
        echo $response -> json($code,$message,$data);
    }
} else {
    $code = 200;
    $message = "error";
    $data = "密码错误";
    echo $response -> json($code,$message,$data);
}
$conn->close();
?>