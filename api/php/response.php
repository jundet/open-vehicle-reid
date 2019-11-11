<?php
class Response{
    public function json($code,$message,$data){
        $result = array(
                "code" => $code,
                "message" => $message,
                "data" => $data
            );
        return json_encode($result);
    }
}
?>