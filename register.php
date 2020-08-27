<?php
  header('content-type:text/html;charset="utf-8"');
  $responseData = array("code" => 0 , "msg" =>"");
  $username = $_POST['username'];
  $password = $_POST['password'];
  $registerTime = $_POST['registerTime'];

  $link = mysql_connect("127.0.0.1","root","123456");

  if(!$link){
    $responseData["code"] = 1;
    $responseData["msg"] = "服务器忙";
    echo json_encode($responseData);
    exit;
  }
  mysql_set_charset("utf8");
  mysql_select_db("section2");

  $sql = "SELECT * FROM project WHERE username = '{$username}'";
  $res = mysql_query($sql);
  $row = mysql_fetch_assoc($res);
  if($row){
    $responseData['code'] = 2;
    $responseData['msg'] = '用户名已存在';
    echo json_encode($responseData);
    exit;
  }

  $str = md5(md5(md5($password).'qianfeng').'qingdao');
  $sql2 = "INSERT INTO project(username , password , registertime) VALUES ('{$username}' , '{$str}' , '{$registerTime}')";
  $res2 = mysql_query($sql2);
  if($res2){
    $responseData['msg'] = '注册成功';
    echo json_encode($responseData);
  }else{
    $responseData['code'] = 5;
    $responseData['msg'] = "注册失败";
    echo json_encode($responseData);
    exit;
  }

  mysql_close($link);

?>