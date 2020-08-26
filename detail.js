define(["jquery" , "jquery-cookie"] , function($){
  show_shoppingcart_content();
  require(["index"] , function(index){
    index.showShoppingCart();
    index.show_nav_Msg();
  })
  

  //详情页
  function show_detail_info(num){
    var str = "";
    $.ajax({
      url : "../data/detail.json",
      success : function(arr){
        str += `<div id="goods_detail_photoList">`;
        for(var i = 0 ; i <arr[num].image_list.length; i++){
          str += `<div>
          <img src="${arr[num].image_list[i]}" alt="">
        </div>`;
        };
        str += `</div>
        <div id="goods_detail_photoMain">
          <img src="${arr[num].main_image[0]}" alt="">
          <div id = "magnifying_small"></div>
          <div id = "magnifying_large"><img src="${arr[num].main_image[0]}" alt=""></div>
        </div>
        <div id="goods_detail_info">
        <h1>${arr[0].title}</h1>
        <article>
          <span>${arr[0].sub_title}</span>
          <i>¥${arr[0].price}.00</i>
        </article>
        <section>
          <span>选择颜色</span>
          <ol>`;
        for(var i = 0 ; i < arr.length ; i++){
          str += `<li><img src="${arr[i].color_img}" alt=""></li>`;
        };
        str += ` </ol>
        </section>
        <div>
          <span>数量选择</span>
          <ul>
            <li>-</li>
            <i>1</i>
            <li>+</li>
          </ul>
        </div>
        <div>
          <span>服务说明</span>
          <p>* ${arr[0].service_description}</p>
        </div>
      </div>`;
      $(".goods_detail").html(str);
      $("#goods_detail_photoList div:first").addClass("active");
      $("#goods_detail_info section ol li").eq(num).addClass("active");   
      },
      error : function(error){
        console.log(error);
      }
    });
    goods_detail_image_switch();
    magnifying_image();
    products_num_count();
    //固定栏操作-添加购物车
    $("#goods_detail_sticky_right div").eq(1).click(function(){
      let id = $(".goods_detail").attr("id");
      let count = $("#goods_detail_info div ul i").html();
      shoppingcart_add_goods({id,count});
      show_shoppingcart_content();
      $("#add_shoppingCart_massage").animate({opacity : 1}, 500);
      setTimeout(function(){
        $("#add_shoppingCart_massage").animate({opacity : 0}, 500);
      },1000);
    })
  }

  //产品信息详细图加载
  function show_goods_detail_products_info(){
    var str = "";
    $.ajax({
      url: "../data/detail.json",
      success : function(arr){
        for(var i = 0 ; i < arr[0].product_detail.length;i++){
          str += `<img src="${arr[0].product_detail[i]}" alt="">
          `;
        }
        $("#goods_detail_imageList").html(str);
      },
      error : function(error){
        console.log(error);
      }
    })
  }
  
  //数量的加减
  var isYes = true;
  function products_num_count(){
  if(isYes){
    $(".goods_detail").on("click","#goods_detail_info div:first ul li:first",function(){
      let num = $(this).closest("ul").find("i").html();
      if(num > 1){
        num--;
      }
      $(this).closest("ul").find("i").html(num);
      $("#goods_detail_sticky_left aside h2 span").html(num);
      $("#goods_detail_sticky_right span").html(`${num * 249}.00`);
      isYes = false;
    }).on("click","#goods_detail_info div:first ul li:last",function(){
      let num = $(this).closest("ul").find("i").html();
      if(num < 5){
        num++;
      }
      $(this).closest("ul").find("i").html(num);
      $("#goods_detail_sticky_right span").html(`${num * 249}.00`);
      $("#goods_detail_sticky_left aside h2 span").html(num);
      isYes = false;
    })
  }
  }

  //实现点击图标换图
  function goods_detail_image_switch(){
    $(".goods_detail").on("click" , "#goods_detail_photoList div" , function(){
      $(this).addClass("active").siblings().removeClass("active");
      let index = $(this).index();
      $.ajax({
        url : "../data/detail.json",
        success : function(arr){
          if($("#goods_detail_info section ol .active").index() == 0){
            $("#goods_detail_photoMain").find("img").attr("src" , arr[0].main_image[index]);
          }else{
            $("#goods_detail_photoMain").find("img").attr("src" , arr[1].main_image[index]);
          }
        },
        error : function(error){
          console.log(error);
        }
      })
    }).on("click" , "#goods_detail_info section ol li" , function(){
      $(this).addClass("active").siblings().removeClass("active");
      let index = $(this).index();
      $(".goods_detail").attr("id" , index + 1);
      $.ajax({
        url : "../data/detail.json",
        success : function(arr){
          $("#goods_detail_photoMain img").attr("src" , arr[index].main_image[0]);
          $("#goods_detail_sticky_left aside p").html(arr[index].color);
          let newArr = arr[index].image_list;
          for(let i = 0 ; i < newArr.length; i++){
            $("#goods_detail_photoList div").eq(i).find("img").attr("src" , newArr[i]);
          }
          $("#goods_detail_sticky_left aside h2 span").html(1);
          $("#goods_detail_sticky_right span").html("249.00");
          $("#goods_detail_info div ul i").html(1)
        },
        error: function(error){
          console.log(error);
        }
      })
    })
  }

  //放大镜效果
  function magnifying_image(){
    $(".goods_detail").on("mouseenter" , "#goods_detail_photoMain" , function(ev){
      
      $(document).mousemove(function(ev){
        var e = ev || window.event;
        var l = e.pageX - $("#goods_detail_photoMain img").offset().left - 40;
        var t = e.pageY - $("#goods_detail_photoMain img").offset().top - 30;
        l = Math.max(10,l);
        l = Math.min(l ,$("#goods_detail_photoMain img").innerWidth() - 100);
        t = Math.max(20 , t);
        t = Math.min(t , $("#goods_detail_photoMain img").innerHeight() - 100);
        $("#goods_detail_photoMain #magnifying_small").css({left:l , top : t  });
        $("#goods_detail_photoMain #magnifying_large img").css({left:-2 *l , top : -2 * t  });
      });
      $("#goods_detail_photoMain div").css("display" , "block");
    }).on("mouseleave" , "#goods_detail_photoMain" , function(){
      $("#goods_detail_photoMain div").css("display" , "none");
    })
  }

  //相关推荐-列表
  function show_goods_detail_recommend(){
    var str = "";
    $.ajax({
      url : "../data/detail.json",
      success : function(arr){
        var newArr = arr[0].recommend;
        for(var i = 0; i < newArr.length ; i++){
          str += ` <li id = "${i + 3}">
          <div class="goods_detail_recommend_img"><img src="${newArr[i].image}" alt=""></div>
          <h3>${newArr[i].title}</h3>
          <h5>${newArr[i].sub_title}</h5>
          <aside>`
            if(newArr[i].color_image){
              str += `<div><img src="${newArr[i].color_image}" alt=""></div>`;
            }
         str += `</aside>
          <article>￥${newArr[i].price}</article>
          <section>
            加入购物车
          </section>
        </li>`;
        }
        $("#goods_detail_recommend_content").html(str);
      },
      error : function(error){
        console.log(error);
      }
    });
    $("#goods_detail_recommend_content").on("mouseenter", "li" , function(){
      $(this).find("section").css("display" , "block");
      $(this).find("article").css("display" , "none");
    }).on("mouseleave" , "li" , function(){
      $(this).find("section").css("display" , "none");
      $(this).find("article").css("display" , "block");
    }).on("click" , "section" , function(){               //点击添加购物车--设置cookie
      let id = $(this).closest("li").attr("id");
      shoppingcart_add_goods({id});
      show_shoppingcart_content();
      $("#add_shoppingCart_massage").animate({opacity : 1}, 500);
      setTimeout(function(){
        $("#add_shoppingCart_massage").animate({opacity : 0}, 500);
      },1000);
    })
  }

   //点击-添加购物车-设置cookie
   function shoppingcart_add_goods({id,count}){
    let firstTime = $.cookie("goods") == null ? true : false;
    if(firstTime){
      let arr = [];
      if(count){
        arr = [{id : id , num : count}];
      }else{
        arr = [{id : id , num : 1}];
      }
      $.cookie("goods" , JSON.stringify(arr) , {
        expires : 7,
        path:"/"
      });
    }else{
      let same = false;
      let cookieArr = JSON.parse($.cookie("goods"));
      for(let i = 0 ; i < cookieArr.length ; i++){
        if(cookieArr[i].id == id){
          if(count){
            cookieArr[i].num =  Number(cookieArr[i].num) + parseInt(count);
          }else{
            cookieArr[i].num++;
          }
          same = true;
          break;
        }
      }
      if(!same){
        if(count){
          var obj= {id : id, num : count};
          cookieArr.push(obj);
        }else{
          var obj= {id : id, num : 1};
          cookieArr.push(obj);
        }
      }
      $.cookie("goods" , JSON.stringify(cookieArr),{
        expires:7,
        path: "/"
      });
    }
    console.log($.cookie("goods"));
  };

  //购物车内容显示
  function show_shoppingcart_content(){
    let str = "";
    if($.cookie("goods")){
      $.ajax({
        url : "../data/detail.json",
        success : function(arr){
          var newArr = [];
          let cookieArr = JSON.parse($.cookie("goods"));
          for(var i = 0; i < arr.length ; i++){
            for(var j = 0 ; j < cookieArr.length ; j++){
              if(cookieArr[j].id == arr[i].id){
                arr[i].num = cookieArr[j].num;
                arr[i].image = arr[i].main_image[0];
                newArr.push(arr[i]);
              }
            }
          };
          for(var i = 0; i < arr[0].recommend.length ; i++){
            for(var j = 0 ; j < cookieArr.length ; j++){
              if(cookieArr[j].id == arr[0].recommend[i].id){
                arr[0].recommend[i].num = cookieArr[j].num;
                newArr.push(arr[0].recommend[i]);
              }
            }
          };
          var count = 0;
          var totalPrice = 0;
          str += `<div class="shoppingCart_content_item_box">`;
          for(var i = 0 ; i < newArr.length; i++){
            str += `<div class="shoppingCart_content_item" id="${newArr[i].id}">
              <div class="item_img"><img src="${newArr[i].image}" alt=""></div>
              <div class="item_info">
                <h3>${newArr[i].title}</h3>
                <h4>${newArr[i].sub_title}</h4>
                <section>
                  <i>¥${newArr[i].price}</i>×<span>${newArr[i].num}</span>
                </section>
              </div>
              <div class = "item_info_delete">X</div>
            </div>`;
            count += Number(newArr[i].num);
            totalPrice += newArr[i].price * newArr[i].num;
          }
          str += `</div>
          <div class="shoppingCart_content_bottom">
          <section>
            <h5>共<span>${count}</span>件商品</h5>
            <p>合计：<span>￥${totalPrice}</span></p>
          </section>
          <article>去购物车</article>
        </div>`;
          $("#shoppingCart_content").html(str);
        },
        error : function(error){
          console.log(error);
        }
      })
    }else{
      str += `<div class = "shoppingCart_content_empty_box">
      <h1 class="icon iconfont icon-che"></h1>
      <h2>购物车为空</h2>
      <span>你还没有选购任何商品，现在前往商城选购吧！</span>
    </div>`;
      $("#shoppingCart_content").html(str);
    }
  }
  //点X 删除内容
  $("#shoppingCart_content").on("click" , ".item_info_delete",function(){
    var id = $(this).closest(".shoppingCart_content_item").remove().attr("id");
    var cookieArr = JSON.parse($.cookie("goods"));
    var index = cookieArr.findIndex(item => item.id == id);
    cookieArr.splice(index,1);
    if(cookieArr.length){
      $.cookie("goods" , JSON.stringify(cookieArr) ,{
        expires : 7,
        path: "/"
      })
    }else{
      $.cookie("goods",null,{
        path: "/"
      });
    }
    show_shoppingcart_content();
  })

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

 

  return {
    show_detail_info,
    show_goods_detail_products_info,
    show_goods_detail_recommend,
    show_shoppingcart_content
  }
})