//console.log("11");
define(["jquery" , "jquery-cookie"] , function(){
  function showShoppingCart(){
    var timer = null;
    $("#shoppingCart_content,#header-right #shoppingCart_header a , #shoppingCart_nav a")
    .mouseenter(function(){
      clearTimeout(timer);
      $("#shoppingCart_content").show();
    });
    $("#shoppingCart_content , #header-right #shoppingCart_header a , #shoppingCart_nav a ").mouseleave(function(){
      timer = setTimeout(() => {
        $("#shoppingCart_content").hide();
      }, 300);
    })
  }

  function switch_nav_Right(){
    $(window).scroll(function(){
      var top = $("#navbox").offset().top;
      if(top > 45){
        $("#nav-right-hide").show();
        $("#search").hide();
        $("#shoppingCart_content").css("top" , top + 75);
      }else{
        $("#nav-right-hide").hide();
        $("#search").show();
        $("#shoppingCart_content").css("top" ,45);
      }
    })
  }

  //选项卡
  function show_nav_Msg(){
    $("#nav-msg-box").mouseenter(function(){
      var top = $("#navbox").offset().top;
      $("#nav-msg-box").css("top", top+75);
      $("#nav-msg-box").show();
    })
    //导航选项卡
    for(var i = 0 ; i < 10 ; i++){
      var node = $("#navbox nav ul li").eq(i).find("a");
      nav_Msg_module(node , i);
    }
    
    $("#nav-msg , #navbox").mouseleave(function(){
      $("#nav-msg-box").hide();
    })

    $(window).scroll(function(){
      $("#nav-msg-box").hide();
    })
  }

  //活动页面
  function show_activities(){
    var str = "";
    $.ajax({
      url : "data/data.json",
      success:function(obj){
        var arr = obj.data.home_activities;
        for(var i = 0; i <arr.length ; i++){
          str += `<div class="activities_container active">
          <img src="${arr[i].image}" alt="">
        </div>`;
        }
        $("#activities").html(str);
      },
      error:function(error){
        console.log(error);
      }
    });

    $("#activities").on("mouseenter", ".activities_container",function(){
      $(this).siblings().find("img").animate({opacity : 1} , 200);
      $(this).find("img").animate({opacity : 0.6} , 200);
    })
    .on("mouseleave", ".activities_container",function(){
      $(this).find("img").animate({opacity : 1} , 200);
    })
  }
  //热门商品
  function show_products_hot(){
    var str = "";
    $.ajax({
      url:"data/data.json",
      success:function(obj){
        var arr = obj.data.home_hot;
        console.log(arr);
      },
      error : function(error){
        console.log(error);
      }
    })
  }






  //设置nav-msg样式的方法
  function nav_Msg_module(node , turn){
    node.mouseenter(function(){
      var top = $("#navbox").offset().top;
      $("#nav-msg-box").css("top", top+75);
      $("#nav-msg-box").show();
      var str = "";
      $.ajax({
        url : "data/nav.json",
        success : function(arr){
          var newArr = arr[turn].list;
          switch(turn){
            case 0:
            case 3:
            case 5:
            case 6:
            case 7:
            case 8:
              for(var i = 0 ; i < newArr.length ; i++){
                var newArr_sub = newArr[i].sub;
                var num = Math.ceil(newArr_sub.length / 4);
                str += ` <div class="nav-msg-container1">
                <h3>${newArr[i].title}</h3>
                <ul style="width:${num * 202}px">`;
                for(var j = 0; j< newArr_sub.length ; j++){
                  str += `<li>
                    <img src="${newArr_sub[j].image}" alt="">
                    <span>${newArr_sub[j].name}</span>
                  </li>`;
                }
                str +=`</ul>
                </div>`;
              };
              break;
            case 1:
            case 2:
            case 4:
            case 9:
              for(var i = 0; i < newArr.length ; i++){
                str += `<div class="nav-msg-container2">
                <img src="${newArr[i].ali_image}" alt="">
                <h2>${newArr[i].sku_name}</h2>
                <p>￥${newArr[i].sell_price}<span>起</span></p>
              </div>`;
              };
              break;
          }
          $("#nav-msg").html(str);
        },
        error: function(error){
          console.log(error);
        }
      })
    });
  }

  function preDef(ev){
    if(ev.preventDefault){
      return ev.preventDefault();
    }else{
      return window.event.returnValue = false;
    }
  }
  return {
    showShoppingCart,
    switch_nav_Right,
    show_nav_Msg,
    show_activities,
    show_products_hot
  }
})