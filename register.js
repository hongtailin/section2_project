define(["jquery"],function($){
  function register(){
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
        }else{
          $("#login_main_msg").css("display" , "none");
        }
      });
    $(".login_main_info input").eq(2)
      .focus(function(){
        $("#login_main_msg").css("display","block");
        $("#login_main_msg").text("重复密码");
      })
      .blur(function(){
        if($(this).val() !=  $(".login_main_info input").eq(1).val()){
          $("#login_main_msg").text("两次输入的密码不一致");
          $("#login_main_msg").css("display","block");
        }else if(!$(this).val() || !$(".login_main_info input").eq(0).val()){
          $("#login_main_msg").text("账号密码不能为空");
          $("#login_main_msg").css("display","block");
        }else{
          $("#login_main_msg").css("display" , "none");
          $("#login_main_btn").bind('click');
          $("#login_main_btn").css("cursor","pointer")
        }
      })
    $("#login_main_btn").click(function(){
      $.ajax({
        type : "post",
        url : "../data/register.php",
        data : {
          username : $(".login_main_info input").eq(0).val(),
          password : $(".login_main_info input").eq(1).val(),
          registerTime: (new Date().getTime()).toLocaleString(),
        },
        success : function(res){
          var obj = JSON.parse(res);
          if(obj.code){
            $("#login_main_msg").css("display","block");
            $("#login_main_msg").text(obj.msg);
          }else{
            $("#login_main_msg").css("display","block");
            $("#login_main_msg").text("注册成功，即将跳转到登录页面");
            setTimeout(() => {
              location.assign("login.html");
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
    register
  }
})