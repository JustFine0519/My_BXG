define(["jquery", "template", "nprogress","cookie"], function($, template,nprogress){
  nprogress.start();
  
  //登录功能
  $(function(){
    nprogress.done();
    //判断用户是否登录了，如果没有登录，就给他跳回到登录页
    //判断用户是否登录的依据，最好是通过向后台发送请求，问后台用户是否登录，这才是最严谨的判断登录的方式，当前项目中没有提供接口，所以不能这么做
    
    //我们就使用PHPSESSID来作为判断用户是否登录的依据即可
    //如果在cookie有PHPSESSID，那么就证明用户已经登录如果在cookie没有PHPSESSID，那么就证明用户没有登录了
    
    //如果不在登录页才执行下面的内容
    if(location.pathname != "/dashboard/login"){
      if(!$.cookie("PHPSESSID")){
        location.href = "/dashboard/login";
      }
      
      //1. 从cookie中获取用户存储好的用户信息
      var userinfo = JSON.parse($.cookie("userinfo"));
      console.log(userinfo);
      //2. 使用模板引擎将对象渲染到用户信息的模板中去
      var html = template("profile_tmp", userinfo);
      $("#profile").html(html);
    }
  
    //退出功能的实现
    $("#logout-btn").click(function () {
      //1.向后台发送ajax请求
      $.ajax({
        url:"/api/logout",
        type:"post",
        success:function (data) {
          console.log(data);
          if(data.code==200){
            //2.接收到请求响应数据后，如果成功，则调回登录页面
            location.href="/dashboard/login";
          }
        }
      })
    });
  

    
    
    //导航栏上实现效果
    $("#course-manage").click(function () {
      $(this).children("ul").stop(200).slideToggle();
    })
  
    //让当前点击的导航栏高亮
    $(".navs a").each(function (index,ele) {
      // console.log($(ele).attr("href"));
      if($(ele).attr("href")==location.pathname){
        // console.log(ele.href);
        $(ele).addClass("active");
      }
    })
  
    //注册ajax全局事件
    $(document).ajaxStart(function () {
      nprogress.start();
    })
  
    $(document).ajaxStop(function () {
      nprogress.done();
    })
  })

})