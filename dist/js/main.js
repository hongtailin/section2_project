// console.log("connect");
require.config({
  paths:{
    jquery : "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    parabola : "parabola",
    index : "index",
    banner : "banner",
    detail : "detail"
  },
  shim : {
    "jquery-cookie" : ["jquery"],
    parabola:{
      exports : "_"
    }
  }
})

require(["index","banner" , "detail"] , function(index,banner , detail){
  index.showShoppingCart();
  index.switch_nav_Right();
  index.show_nav_Msg();
  index.show_activities();
  index.show_products_hot();
  index.products_list();

  detail.showShoppingCart_detail();
  detail.show_nav_Msg_detail();
  detail.show_detail_info(0);
  detail.show_goods_detail_products_info();
  detail.show_goods_detail_recommend();

  banner.bannerMain();
})