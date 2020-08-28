define(["jquery" , "jquery-cookie"],function($){
  function main_shoppingCart(){
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
          str += `<div id="shoppingCart_main_content_item">
          <h2>
            <p>商品信息</p>
            <span>单价</span>
            <span>数量</span>
            <span>小计</span>
            <span>操作</span>
          </h2>`;
          for(var i = 0 ; i < newArr.length; i++){
            let total = newArr[i].price * newArr[i].num;
            str += `<div class="shoppingCart_main_content_item_list" id= "${newArr[i].id}">
            <div class="checkbox_box"><input type="checkbox" name="select" id="" checked></div>
            <div class="shoppingCart_main_content_item_info">
              <div class="shoppingCart_main_content_item_img">
                <img src="${newArr[i].image}" alt="">
              </div>
              <div class="shoppingCart_main_content_item_title">
                <h3>${newArr[i].title}</h3>
                <h4>${newArr[i].color}</h4>
              </div>
              <div class="shoppingCart_main_content_item_price">￥<span>${newArr[i].price}</span></div>
              <ul>
                <li>-</li>
                <span>${newArr[i].num}</span>
                <li>+</li>
              </ul>
              <div class="shoppingCart_main_content_item_total">￥<span>${total}</span></div>
              <div class="shoppingCart_main_content_item_operation">
                <i>×</i>
              </div>
            </div>
          </div>`;
            count += Number(newArr[i].num);
            totalPrice += newArr[i].price * newArr[i].num;
          }
          str += `<div class="shoppingCart_main_content_item_bottom">
          <div class="shoppingCart_main_content_item_bottom_left">
            <input type="checkbox" name="px" id="allcheck" value = "1" checked>
            <span>全选</span>
            <aside>删除选中的商品</aside>
          </div>
          <div class="shoppingCart_main_content_item_bottom_right">
            <div class="shoppingCart_main_content_item_bottom_right_count">
              <h4>已选择<span>${count}</span>件商品</h4>
              <h5>共计<span>${count}</span>件商品</h5>
            </div>
            <div class="shoppingCart_main_content_item_bottom_right_price">
              应付总额：￥<span>${totalPrice}</span>
            </div>
            <div class="shoppingCart_main_content_item_bottom_right_calculate">
              现在结算
            </div>
          </div>
        </div>`;
          $("#shoppingCart_main_content").html(str);
        },
        error : function(error){
          console.log(error);
        }
      })
    }else{
      str += `<div id="shoppingCart_main_content_empty">
      <i class="icon iconfont icon-gouwudai"></i>
      <p>您的购物袋还没有商品</p>
      <section>
        <div><a href="login.html">登录</a></div>
        <div><a href="detail.html">现在选购</a></div>
      </section>
    </div>`;
      $("#shoppingCart_main_content").html(str);
    }
  }

  $("#shoppingCart_main_content").on("click" , ".shoppingCart_main_content_item_info ul li" , function(){
    let num = $(this).siblings("span").html();
    if($(this).index() == 0){
      if(num > 1){
        num--;
      }else{
        alert("不能少于一个");
      }
    }else{
      num++;
    };
    //数量变化
    $(this).siblings("span").html(num);
    countsAll();
    counts();
    //改cookie
    var id = $(this).closest(".shoppingCart_main_content_item_list").attr("id");
    var cookieArr = JSON.parse($.cookie("goods"));
    var index = cookieArr.findIndex(item => item.id == id);
    cookieArr[index].num = num;
    $.cookie("goods",JSON.stringify(cookieArr), {
      expires:7,
      path: "/"
    })

    //根据数量的变化 小计变化
    let price = $(this).closest("ul").siblings(".shoppingCart_main_content_item_price").find("span").html();
    $(this).closest("ul").siblings(".shoppingCart_main_content_item_total").find("span").html(price * num);

    totalPrice()
  })
  //复选框操作
  //全选
  $("#shoppingCart_main_content").on("click" , "#allcheck" , function(){
    var flag = $(this).prop("checked");
    if(flag){
      $(".checkbox_box input").prop("checked" , true);
    }else{
      $(".checkbox_box input").prop("checked" , false);
    }
    counts();
    totalPrice();
  })

  //单选
  $("#shoppingCart_main_content").on("click" , ".checkbox_box input" , function(){
    var flag = $(this).prop("checked");
    var boxNum = $(".checkbox_box input").length ;
    var selectNum = $(".checkbox_box input:checked").length;
    if(selectNum == boxNum){
      $("#allcheck").prop("checked" , true);
    }else{
      $("#allcheck").prop("checked" , false);
    }
    counts();
    totalPrice();
  })

  //单项删除
  $("#shoppingCart_main_content").on("click" , ".shoppingCart_main_content_item_operation i" , function(){
    $(this).closest(".shoppingCart_main_content_item_list").remove();
    counts();
    countsAll();
    totalPrice();
    var id = $(this).closest(".shoppingCart_main_content_item_list").attr("id");
    var cookieArr = JSON.parse($.cookie("goods"));
    var index = cookieArr.findIndex(item => item.id == id);
    cookieArr.splice(index,1);
    if(cookieArr.length){
      $.cookie("goods",JSON.stringify(cookieArr), {
        expires:7,
        path: "/"
      })
    }else{
      $.cookie("goods",null,{
        path: "/"
      });
    }
    main_shoppingCart();
  })
  //选中项删除
  $("#shoppingCart_main_content").on("click" , ".shoppingCart_main_content_item_bottom_left aside" , function(){
    $(".checkbox_box input:checked").each(function(){
      var id = $(this).closest(".shoppingCart_main_content_item_list").attr("id");
      var cookieArr = JSON.parse($.cookie("goods"));
      var index = cookieArr.findIndex(item => item.id == id);
      cookieArr.splice(index,1);
      if(cookieArr.length){
        $.cookie("goods",JSON.stringify(cookieArr), {
          expires:7,
          path: "/"
        })
      }else{
        $.cookie("goods",null,{
          path: "/"
        });
      }
    });
    main_shoppingCart();
  })

  function counts(){
    var sum = 0;
    $(".checkbox_box input:checked").each(function(i){
      sum += parseInt($(this).closest(".shoppingCart_main_content_item_list").find("ul span").html());
    })
    $(".shoppingCart_main_content_item_bottom .shoppingCart_main_content_item_bottom_right_count h4 span").html(sum);
  }

  function countsAll(){
    var sum = 0;
    $(".checkbox_box input").each(function(i){
      sum += parseInt($(this).closest(".shoppingCart_main_content_item_list").find("ul span").html());
    })
    $("#shoppingCart_main_content_item .shoppingCart_main_content_item_bottom_right_count h5 span").html(sum);
  }

  function totalPrice(){
    var price = 0;
    $(".checkbox_box input:checked").each(function(i){
      price += parseFloat($(this).closest(".shoppingCart_main_content_item_list").find(".shoppingCart_main_content_item_total span").html());
    })
    $(".shoppingCart_main_content_item_bottom .shoppingCart_main_content_item_bottom_right_price span").html(price);
  }

  return {
    main_shoppingCart
  }
})