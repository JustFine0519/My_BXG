/**
 * Created by hewan on 2017-09-16.
 */
define(["jquery","form"],function ($) {
  $("form").submit(function () {
    $(this).ajaxSubmit({
      url:"/api/course/create",
      type:"post",
      success:function (data) {
        if(data.code==200){
          location.href="/course/basic?id="+data.result.cs_id;
        }
      }
    });
    return false;
  })
})