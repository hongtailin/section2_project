<?php
  header('content-type:text/html;charset="utf-8"');
  $responseData = array("code" => 0 , "msg" => "");
  $username = $_POST['username'];
  $password = $_POST['password'];

  if(!$username){
    $responseData['code'] = 2;
    $responseData['msg'] = "用户名不能为空";
    echo json_encode($responseData);
    exit;
  }
  if(!$password){
    $responseData['code'] = 2;
    $responseData['msg'] = "密码不能为空";
    echo json_encode($responseData);
    exit;
  }
  $link = mysql_connect("127.0.0.1","root","123456");
  if(!$link){
    $responseData['code'] = 1;
    $responseData['msg'] = "服务器忙";
    echo json_encode($responseData);
    exit;
  }
  mysql_set_charset("utf8");
  mysql_select_db("section2");

  $str = md5(md5(md5($password)."qingdao")."qianfeng");

  $sql = "SELECT * FROM users WHERE username ='{$username}' AND password='{$str}' ";

  $res = mysql_query($sql);

  $row = mysql_fetch_assoc($res);

  if($row){
    $responseData['msg'] = "登录成功";
    echo json_encode($responseData);
  }else{
    $responseData['code'] = 4;
    $responseData['msg'] = "账号或密码错误";
    echo json_encode($responseData);
    exit;
  }

  mysql_close($link);


?>