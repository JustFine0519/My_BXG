/**
 * Created by hewan on 2017-09-11.
 */

define(["jquery","cookie"],function ($) {
  $(function () {
    //1.获取表单，注册提交事件
    $("form").submit(function (e) {
      //1.1.获取用户输入信息
      var uname=$("#tc_name").val();
      var upwd=$("#tc_pass").val();
      
      //1.2判断用户名密码是否为空
      if(uname.trim()==""){
        alert("请输入用户名");
        return false;
      }
      if(upwd.trim()==""){
        alert("请输入密码");
        return false;
      }
      
      //2.将数据发送给后台,让后台进行验证
      $.ajax({
        //2.1数据接口地址
        url:"/api/login",
        //2.2请求方式
        type:"post",
        //2.3请求的参数
        data:{
          tc_name:uname,
          tc_pass:upwd
        },
        success:function (data) {
          if(data.code==200){
            $.cookie("userinfo",JSON.stringify(data.result),{expires: 365, path: "/"});
            
            //跳转到首页
            location.href="/dashboard/index";
            console.log(data);
          }
        }
      });
      
      //阻止表单的默认提交事件
      //e.preventDefault();
      return false;
    })
  })
})
