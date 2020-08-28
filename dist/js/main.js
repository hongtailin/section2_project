// console.log("connect");
require.config({
  paths:{
    jquery : "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    parabola : "parabola",
    index : "index",
    banner : "banner",
    detail : "detail",
    shoppingCart : "shoppingCart",
    login : "login",
  },
  shim : {
    "jquery-cookie" : ["jquery"],
    parabola:{
      exports : "_"
    }
  }
})

require(["index","banner" , "detail", "shoppingCart","login"] , function(index,banner , detail,shoppingCart,login){
  index.showShoppingCart();
  index.switch_nav_Right();
  index.show_nav_Msg();
  index.show_activities();
  index.show_products_hot();
  index.products_list();

  detail.show_detail_info(0);
  detail.show_goods_detail_products_info();
  detail.show_goods_detail_recommend();

  shoppingCart.main_shoppingCart();

  login.login_func();

  banner.bannerMain();
})