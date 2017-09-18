/**
 * Created by hewan on 2017-09-17.
 */
define(["jquery","template","utils","bootstrap","form"],function ($,template,utils) {
  var  id=utils.getQueryObj().id;
  console.log(id);
  $.ajax({
    url:"/api/course/lesson",
    data:{
      cs_id:id
    },
    success:function (data) {
      if(data.code==200){
        console.log(data);
        var html=template("lessons_tmp",data.result);
        $(".steps").html(html);
      }
    }
  })
  $(".steps").on("click","#add-btn,.edit-btn",function () {
    //判断是添加功能还是编辑功能
    if($(this).prop("id")=="add-btn"){
      var obj={
        title:"添加课时",
        url:"/api/course/chapter/add",
        buttonText:"添加"
      }

      var html=template("modal_tmp",obj);
      $(".modal-dialog").html(html);
    }else{
      //1.要向后台请求当前要编辑的课时信息
      var ct_id=$(this).data("id");
      $.ajax({
        url:"/api/course/chapter/edit",
        data:{
          ct_id:ct_id
        },
        success:function (data) {
          if(data.code==200){
            data.result.title="编辑课时";
            data.result.url="/api/course/chapter/modify";
            data.result.buttonText="保存";
            var html=template("modal_tmp",data.result);
            $(".modal-dialog").html(html);
          }
        }
      })
    }
    $("#chapterModal").modal("show");
  })
  $("#chapterModal").on("click","#save-btn",function () {
    $("form").ajaxSubmit({
      data:{
        ct_cs_id:id,
        ct_is_free:Number($("#is_free").prop("checked")),
      },
      success:function (data) {
        if(data.code == 200){
          //将列表数据重新渲染
          //1. 向后台发送ajax请求

          $.ajax({
            url: "/api/course/lesson",
            data: {
              cs_id: id
            },
            success: function(data){
              if(data.code == 200){
                // console.log(data);
                var html = template("lessons_list_tmp", data.result);
                $(".lessons").html(html);
                $("#chapterModal").modal("hide");
              }
            }
          })
        }
      }
    })
  })
})