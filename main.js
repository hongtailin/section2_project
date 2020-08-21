// console.log("connect");
require.config({
  paths:{
    jquery : "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    parabola : "parabola",
    index : "index",
    banner : "banner"
  },
  shim : {
    "jquery-cookie" : ["jquery"],
    parabola:{
      exports : "_"
    }
  }
})

require(["index","banner"] , function(index,banner){
  index.showShoppingCart();
  index.switch_nav_Right();
  index.show_nav_Msg();
  index.show_activities();
  index.show_products_hot();
  banner.bannerMain();
})