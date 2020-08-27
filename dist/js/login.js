define(["jquery"],function($){
  function login_func(){
    $("#login_main_btn").unbind('click');
    var phoneNum = /^1\d{10}$/i;
    var email = /^\w+@\w+.\w+$/i;
    $(".login_main_info input").eq(0)
      .focus(function(){
        $("#login_main_msg").css("display","block");
        $("#login_main_msg").text("输入手机号/邮箱");
      })
      .blur(function(){
        if(!$(this).val()){
          $("#login_main_msg").css("display","block");
          $("#login_main_msg").text("用户名不能为空");
        }else if(!(phoneNum.test($(this).val()) || email.test($(this).val()))){
          $("#login_main_msg").text("手机号/邮箱格式错误");
        }else{
          $("#login_main_msg").css("display" , "none");
          }
      });
    $(".login_main_info input").eq(1)
      .focus(function(){
        $("#login_main_msg").css("display","block");
        $("#login_main_msg").text("输入密码");
      })
      .blur(function(){
        if(!$(this).val()){
          $("#login_main_msg").text("密码不能为空");
          $("#login_main_msg").css("display","block");
        }else if(!$(this).val() || !$(".login_main_info input").eq(0).val()){
          $("#login_main_msg").text("账号密码不能为空");
          $("#login_main_msg").css("display","block");
        }else{
          $("#login_main_msg").css("display" , "none");
          $("#login_main_btn").bind('click');
          $("#login_main_btn").css("cursor","pointer")
        }
      });
    $("#login_main_btn").click(function(){
      $.ajax({
        type : "post",
        url : "../data/login.php",
        data : {
          username : $(".login_main_info input").eq(0).val(),
          password : $(".login_main_info input").eq(1).val(),
        },
        success : function(res){
          var obj = JSON.parse(res);
          if(obj.code){
            $("#login_main_msg").css("display","block");
            $("#login_main_msg").text(obj.msg);
            $("#login_main_btn").css("cursor","not-allowed")
          }else{
            $("#login_main_msg").css("display","block");
            $("#login_main_msg").text("登录成功，即将跳转到首页");
            setTimeout(() => {
              location.assign("../index.html");
            }, 2000);
          }
        },
        error: function(error){
          console.log(error);
        }
      })

    });
  }
  return {
    login_func
  }
})