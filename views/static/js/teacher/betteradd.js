/**
 * Created by hewan on 2017-09-14.
 */
define (["jquery","template","utils","form"],function ($,template,utils) {
  var tc_id=utils.getQueryObj().id;
  if(tc_id){
    $.ajax({
      url:"/api/teacher/edit",
      data:{
        tc_id:tc_id
      },
      success:function (data) {
        if(data.code==200){
          data.result.title = "编辑讲师";
          data.result.btnText = "保 存";
          data.result.url = "/api/teacher/update";
          renderData(data.result);
        }
      }
    })
  }else{
    var obj={
      title: "添加讲师",
      btnText: "添 加",
      url: "/api/teacher/add"
    }
    renderData(obj);
  }
  
  function renderData(data) {
    var html = template("teacher_add_edit_tmp", data);
    $(".body,.teacher").html(html);
  }
  
  //给保存按钮注册点击事件
  $(".body,.teacher").on("submit","form",function () {
    $(this).ajaxSubmit({
      success:function (data) {
        if(data.code==200){
          location.href="/teacher/list"
        }
      }
    })
    return false;
  })
})