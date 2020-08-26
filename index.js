//console.log("11");
define(["jquery" , "jquery-cookie"] , function($){
  
  require(["detail"], function(det){
    //刷新cookie
    $("#header-right #shoppingCart_header a , #shoppingCart_nav a").mouseenter(function(){
      det.show_shoppingcart_content();
    })
  })
  
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
    });
  }

  function switch_nav_Right(){
    $(document).scroll(function(){
      var top = $("#navbox").offset().top;
      if(top > 45.1){
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
      url : "../data/data.json",
      success:function(obj){
        var arr = obj.data.home_activities;
        for(var i = 0; i <arr.length ; i++){
          str += `<div class="activities_container active_box">
          <img src="${arr[i].image}" alt="">
        </div>`;
        }
        $("#activities").html(str);
      },
      error:function(error){
        console.log(error);
      }
    });

    //滑入有选中的效果
    select_style1("#activities" , ".activities_container");
  }
  //热门商品
  function show_products_hot(){
    var str = "";
    $.ajax({
      url:"../data/data.json",
      success:function(obj){
        var arr = obj.data.home_hot;
        for(let i = 0; i < arr.length ; i++){
          var newArr = arr[i].spu.sku_info;
          str += `<li>
          <div class = "products_hot_content_img""><img src="${newArr[0].ali_image}" alt=""></div>
          <h3>${newArr[0].title}</h3>
          <h5>${newArr[0].sub_title}</h5>
          <aside>
            `;
          //判断有几个颜色
          var newArr_color = [];
          for(let i = 0; i < newArr.length ; i++){
            let arr_temp = newArr[i].spec_json;
            for(let i = 0; i < arr_temp.length ; i++){
              if(arr_temp[i].image){
                if($.inArray(arr_temp[i].image,newArr_color) == -1){
                  newArr_color.push(arr_temp[i].image);
                }
              }
            }
          }
          for(let i = 0 ; i < newArr_color.length; i++){
            str += `<div class="products_hot_content_img_color"><img src="${newArr_color[i]}" alt=""></div>
            `;
          }
          str += `</aside>
          <article>￥${newArr[0].price}</article>
        </li>`;
        }
        $("#products_hot_content ul").html(str);
      },
      error : function(error){
        console.log(error);
      }
    })
    //左右滑动
    var status = 0;
    $("#products_hot_title_btn li").eq(0).click(function(){
      if(status == 1){
        $("#products_hot_content ul").animate({left : 0} ,500);
        status = 0;
      }
    })
    $("#products_hot_title_btn li").eq(1).click(function(){
      if(status == 0){
        $("#products_hot_content ul").animate({left : -1220} ,500);
        status = 1;
      }
    })

    //鼠标滑入颜色框，转数据
    $("#products_hot_content").on("mouseenter" , ".products_hot_content_img_color" , function(){
      $(this).addClass("active");
      $(this).siblings().removeClass("active");
      var index_li = $(this).closest("li").index();
      var nowColor = $(this).find("img").attr("src");
      var _this = $(this);
      $.ajax({
        url : "data/data.json",
        success: function(obj){
          var arr = obj.data.home_hot[index_li].spu.sku_info;
          for(var i = 0; i < arr.length; i++){
            var newArr = arr[i].spec_json;
            for(var j = 0 ;j < newArr.length ; j++){
              if(newArr[j].image == nowColor){
                _this.closest("li").find(".products_hot_content_img img").attr("src" , arr[i].ali_image);
                break;
              }
            }
          }
        },
        error : function(error){
          console.log(error);
        }
      })
    })

    //选中效果
    select_style2("#products_hot_content" , "li");
  }

  //产品列表显示
  function products_list(){
    var str = "";
    $.ajax({
      url : "../data/data.json",
      success: function(obj){
        arr = obj.data.home_floors;
        for(let i = 0; i < arr.length ; i++){
          str += `<div class="products_list_box">
          <div class="products_list_title">
          <h2>${arr[i].title}</h2>
        </div>
        <div class="products_list_content">
          <ul>
            <div class="products_list_content_mainImg"><img src="${arr[i].tabs[0].tab_items[0].image}" alt=""></div>`;
          var newArr = arr[i].tabs[0].tab_items;
          for(let i = 1 ; i < newArr.length ; i++){
            str += `<li>
            <div class="products_hot_content_img"><img src="${newArr[i].spu.sku_info[0].ali_image}" alt=""></div>
              <h3>${newArr[i].spu.sku_info[0].title}</h3>
              <h5>${newArr[i].spu.sku_info[0].sub_title}</h5>
              <aside>
                `;
            let newArr_color = [];
            var arr_li = newArr[i].spu.sku_info;
            for(let i = 0; i < arr_li.length;i++){
              var arr_temp = arr_li[i].spec_json;
              for(let i = 0; i < arr_temp.length ; i++){
                if(arr_temp[i].image){
                  if($.inArray(arr_temp[i].image,newArr_color) == -1){
                    newArr_color.push(arr_temp[i].image);
                  }
                }
              }
            }
            for(let i = 0 ; i < newArr_color.length; i++){
              str += `<div class="products_hot_content_img_color"><img src="${newArr_color[i]}" alt=""></div>
              `;
            }
            str += `</aside>
            <article>￥${newArr[i].spu.sku_info[0].price}</article>
        </li>`;
          }
          str += `</ul>
          </div>
        </div>`;
        }
        $("#products_list").html(str);
      },
      error : function(error){
        console.log(error);
      }
    });

    //鼠标滑入颜色框，转数据
    $("#products_list").on("mouseenter" , ".products_hot_content_img_color" , function(){
      $(this).addClass("active");
      $(this).siblings().removeClass("active");
      var index_div_box = $(this).closest(".products_list_box").index();
      var index_li = $(this).closest("li").index();
      var nowColor = $(this).find("img").attr("src");
      var _this = $(this);
      $.ajax({
        url : "../data/data.json",
        success: function(obj){
          var arr = obj.data.home_floors[index_div_box].tabs[0].tab_items[index_li].spu.sku_info;
          for(var i = 0; i < arr.length; i++){
            var newArr = arr[i].spec_json;
            for(var j = 0 ;j < newArr.length ; j++){
              if(newArr[j].image == nowColor){
                _this.closest("li").find(".products_hot_content_img img").attr("src" , arr[i].ali_image);
                break;
              }
            }
          }
        },
        error : function(error){
          console.log(error);
        }
      })
    });
    select_style2("#products_list" , "li");
  }

  function select_style2(nodeFather , node){
    $(nodeFather).on("mouseenter" , node , function(){
      $(this).addClass("active_box");
      $(this).siblings().removeClass("active_box")
    }).on("mouseleave" , node , function(){
      $(this).removeClass("active_box");
    })
  }


  //滑入有选中的效果(参数选择器-字符串)
  function select_style1(nodeFather , node){
    $(nodeFather).on("mouseenter", node,function(){
      $(this).siblings().find("img").animate({opacity : 1} , 200);
      $(this).find("img").animate({opacity : 0.6} , 200);
    })
    .on("mouseleave", node,function(){
      $(this).find("img").animate({opacity : 1} , 200);
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
        url : "../data/nav.json",
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
    show_products_hot,
    products_list
  }
})