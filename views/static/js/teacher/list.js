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
        // console.log(data);
        // 将获取到的讲师列表数据，展示到页面中
        var html=template("teacher_list_tmp",data);
        $("#teacher_list").html(html);
      }
    })
  
    
    // 给所有的查看按钮注册点击事件
    $("#teacher_list").on("click",".check-info",function () {
      // 获取当前讲师的id
      var tc_id=$(this).parent().data("id");
      // console.log(tc_id);
      // 1.发送请求获取当前行讲师信息
      $.ajax({
        url:"/api/teacher/view",
        data:{
          tc_id:tc_id
        },
        success:function (data) {
          // console.log(data);
          if(data.code==200){
            // 2.将数据渲染到模态框中
            var html=template("teacher_modal_tmp",data.result);
            $("#teacherModal>.modal-dialog").html(html);
            // 3.展示模态框
            $("#teacherModal").modal("show");
          }
        }
      })
    })
  
  
    //讲师的注销以及启用功能分析
    //讲师账号会有两种状态，已启用 和 已注销
    //tc_status==0  已启用
    //tc_status==1  已注销
  
    //给所有的注销、启用按钮注册点击事件
    $("#teacher_list").on("click",".btn-status",function () {
      var tc_id=$(this).parent().data("id");
      var tc_status=$(this).data("status");
      var that=$(this);
      $.ajax({
        url:"/api/teacher/handle",
        type:"post",
        data:{
          tc_id:tc_id,
          tc_status:tc_status
        },
        success:function (data) {
          if(data.code==200){
            // console.log(data);
            if(data.result.tc_status==1){
              that.removeClass("btn-warning").addClass("btn-success").text("启用");
            }else{
              that.removeClass("btn-success").addClass("btn-warning ").text("注销");
            }
            //需要将当前按钮中保存的 data-status改成修改后的状态
            that.data("status",data.result.tc_status);
          }
        }
      })
    })
    
    
  
  })
})