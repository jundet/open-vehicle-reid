<?php
require "response.php"; 
require "config.php"; 
require "request.php"; 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers:token");

$header = get_all_headers();
$usertoken = $header['token'];

$response = new Response;
$output = array();
$data = array();
$app = $_GET['app'];
// 访客处理
if($usertoken=='guestoken' || $usertoken==''){
  $code = 200;
  $message = "success";
  $data = json_decode('[
  {
    "text": "实验平台",
    "group": true,
    "hideInBreadcrumb": true,
    "children": [
      {
        "text": "实验",
        "icon": "anticon anticon-dashboard",
        "children": [
          {
            "text": "卷积计算",
            "link": "/ai/conv"
          }
        ]
      }
    ]
  }]',true);
  echo $response -> json($code,$message,$data);
}
//用户处理，仅允许单点登录
else{
  $code = 200;
  $message = "success";
  $data = json_decode('[
  {
    "text": "实验平台",
    "group": true,
    "hideInBreadcrumb": true,
    "children": [
      {
        "text": "实验",
        "icon": "anticon anticon-dashboard",
        "children": [
          {
            "text": "模型",
            "link": "/ai/model"
          },{
            "text": "卷积计算",
            "link": "/ai/conv"
          }
        ]
      }
    ]
  }]',true);
  echo $response -> json($code,$message,$data);
}  

?>