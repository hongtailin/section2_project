const gulp = require("gulp");

//html
const htmlmin = require("gulp-htmlmin");
gulp.task("copy-html" ,function(){
  return gulp.src(["*.html" , "!index.html"])
  .pipe(
    htmlmin({
      removeEmptyAttibutes: true, // 移出所有空属性
      collapseWhitespace: true, // 压缩 html
    })
  )
  .pipe(gulp.dest("dist/html"))
  .pipe(connect.reload());
})

gulp.task("copy-index" , function(){
  return gulp.src("index.html")
  .pipe(
    htmlmin({
      removeEmptyAttibutes: true, // 移出所有空属性
      collapseWhitespace: true, // 压缩 html
    })
  )
  .pipe(gulp.dest("dist/"))
  .pipe(connect.reload());
})

//json
gulp.task("data" , function(){
  return gulp.src(["*.{json,php}" , "!package.json"])
  .pipe(gulp.dest("dist/data"))
  .pipe(connect.reload());
})

//js
gulp.task("script" , function(){
  return gulp.src(["*.js" , "!gulpfile.js"])
  .pipe(gulp.dest("dist/js"))
  .pipe(connect.reload());
})

gulp.task("build", ["copy-html" , "copy-index" , "data" , "script"] , function(){
  console.log("项目建立成功");
})

//scss
const scss = require("gulp-sass");
const minify = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("index-scss",function(){
  return gulp.src("stylesheet/index.scss")
  .pipe(scss())
  .pipe(gulp.dest("dist/css"))
  .pipe(minify())
  .pipe(rename("index.min.css"))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})

gulp.task("index-scss_detail",function(){
  return gulp.src("stylesheet/detail.scss")
  .pipe(scss())
  .pipe(gulp.dest("dist/css"))
  .pipe(minify())
  .pipe(rename("detail.min.css"))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})

gulp.task("index-scss_shoppingCart",function(){
  return gulp.src("stylesheet/shoppingCart.scss")
  .pipe(scss())
  .pipe(gulp.dest("dist/css"))
  .pipe(minify())
  .pipe(rename("shoppingCart.min.css"))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})

gulp.task("index-scss_login",function(){
  return gulp.src("stylesheet/login.scss")
  .pipe(scss())
  .pipe(gulp.dest("dist/css"))
  .pipe(minify())
  .pipe(rename("login.min.css"))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})

gulp.task("index-scss_register",function(){
  return gulp.src("stylesheet/register.scss")
  .pipe(scss())
  .pipe(gulp.dest("dist/css"))
  .pipe(minify())
  .pipe(rename("register.min.css"))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})

//监听
gulp.task("watch" , function(){
  gulp.watch(["*.html" , "!index.html"], ["copy-html"]);
  gulp.watch("index.html" , ["copy-index"]);
  gulp.watch(["*.{json,php}" , "!package.json"] , ["data"]);
  gulp.watch(["*.js" , "!gulpfile.js"] , ["script"]);
  gulp.watch("stylesheet/index.scss" , ["index-scss"]);
  gulp.watch("stylesheet/detail.scss" , ["index-scss_detail"]);
  gulp.watch("stylesheet/shoppingCart.scss" , ["index-scss_shoppingCart"]);
  gulp.watch("stylesheet/login.scss",["index-scss_login"]);
  gulp.watch("stylesheet/register.scss",["index-scss_register"]);
})

//服务器
const connect = require("gulp-connect");
gulp.task("server" , function(){
  connect.server({
    root : "dist",
    port: 8888,
    livereload : true
  })
})

gulp.task("default" , ["watch" , "server"]);