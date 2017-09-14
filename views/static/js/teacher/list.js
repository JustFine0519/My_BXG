/**
 * Created by hewan on 2017-09-12.
 */
define(["jquery","template","bootstrap"],function ($,template) {
  
  //教师信息列表的展示
  $(function () {
    // 1.加载列表数据
    $.ajax({
      url:"/api/teacher",
      success:function (data) {
         console.log(data);
        // 将获取到的讲师列表数据，展示到页面中
        var html=template("teacher_list_tmp",data);
        $("#teacher_list").html(html);
      }
    })
  })
})