/**
 * Created by hewan on 2017-09-13.
 */

//讲师添加功能{
// 1.获取用户输入的表单信息
// 2.发送ajax请求,保存数据{
// url地址:/api/teacher/add
// type:post
// 参数:tc_name  tc_pass  tc_join_date  tc_type  tc_gender
// }
// }

//讲师编辑功能{
// 1.先要发送ajax请求获取当前要编辑的讲师的信息
//url地址: /teacher/edit
// 2.将获取到的数据渲染到页面上
// 3.获取用户输入的表单信息
// 4.发送ajax请求,保存数据{
//url地址:/teacher/update
// type:post
// 参数:tc_id  tc_name  tc_join_date  tc_type  tc_gender
// }
// }


define(["jquery","template","utils"],function ($,template,utils) {
  //判断当前是编辑功能还是添加功能
  var tc_id=utils.getQueryObj().id;
  
  if(tc_id){
    //编辑功能
    //1.获取当前要编辑的讲师的详细信息
    $.ajax({
      url:"/api/teacher/edit",
      data:{
        tc_id:tc_id
      },
      success:function (data) {
        if(data.code==200){
          // console.log(data);
          data.result.title="编辑讲师";
          data.result.btntext="保 存";
          var html=template("teacher_add_edit_tmp",data.result);
          $(".body,.teacher").html(html);
          $("#save-btn").click(function () {
            //2.获取用户输入的内容
            //3.将这些内容通过ajax请求发送给后台进行保存
            $.ajax({
              url:"/api/teacher/update",
              type:"post",
              data:$("form").serialize(),
              success:function (data) {
                console.log(data);
                if(data.code==200){
                  location.href="/teacher/list"
                }
              }
            })
            //4.保存成功之后返回列表页
            return false;
          })
        }
      }
    })
    
  }else{
    //添加功能
    
    //设置数据，将模板渲染到页面上去
    var obj={
      title:"添加讲师",
      btntext:"添 加"
    }
    var html=template("teacher_add_edit_tmp",obj);
    //并集选择器
    $(".body,.teacher").html(html);
    
    //保存数据
    $("#save-btn").click(function () {
      //1.获取用户输入的内容
      //2.将这些内容通过ajax请求发送给后台进行保存
      //3.保存成功之后返回列表页
      $.ajax({
        url:"/api/teacher/add",
        type:"post",
        data:$("form").serializeArray(),
        success:function (data) {
          console.log(data);
          if(data.code==200){
            location.href="/teacher/list"
          }
        }
      })
      // console.log($("form").serializeArray());
      
      // 阻止表单的默认提交
      return false;
    })
  }
})