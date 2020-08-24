define(["jquery"] , function($){
  function bannerMain(){
    var oUl = $("#banner-ul");
    var aBtns = $("#banner ol li");
    var iNow = 0;
    var timer = null;

    $.ajax({
      url : "../data/data.json",
      success : function(obj){
        var arr = obj.data.home_carousel;
        var str = "";
        for(var i = 0 ; i < arr.length ; i++){
          str += `<li><img src="${arr[i].image[0]}" alt=""></li>`;
        }
        str += `<li><img src="${arr[0].image[0]}" alt=""></li>`
        $("#banner #banner-ul").html(str);
      },
      error : function(error){
        console.log(error);
      }
    })

    /* timer = setInterval(function(){
      iNow++;
      tab();
    },2000); */

    $("#banner")
    .mouseenter(function(){
      clearInterval(timer);
    })
    .mouseleave(function(){
      timer = setInterval(function(){
        iNow++;
        tab();
      },2000);
    })

    aBtns.click(function(){
      iNow = $(this).index();
      tab();
    })

    function tab(){
      aBtns.removeClass("active").eq(iNow).addClass("active");
      if(iNow == aBtns.size()){
        aBtns.eq(0).addClass("active");
      }
      oUl.animate({left : -1218 * iNow} , 500 , function(){
        if(iNow == aBtns.size()){
          iNow = 0;
          oUl.css("left" , 0);
        }
      })
    }
  }

  return {
    bannerMain
  }
})