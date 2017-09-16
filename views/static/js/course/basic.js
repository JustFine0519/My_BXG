/**
 * Created by hewan on 2017-09-16.
 */
define(["jquery","template","utils","ckeditor","form"],function ($,template,utils,ckeditor) {
  var cs_id=utils.getQueryObj().id;
  
  $.ajax({
    url:"/api/course/basic",
    type:"get",
    data:{
      cs_id:cs_id
    },
    success:function (data) {
      if(data.code==200){
        console.log(data);
        var html=template("basic_tmp",data.result);
        $("#steps").html(html);
  
        //富文本编辑器
        ckeditor.replace("cs_brief", {
          toolbarGroups : [
            { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
            { name: 'insert' },
            { name: 'tools' },
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
          ]
        });
        
        $("form").submit(function () {
          ckeditor.instances.cs_brief.updateElement();
          $(this).ajaxSubmit({
            url:"/api/course/update/basic",
            type:"post",
            success:function (data) {
              if(data.code==200){
                console.log(data);
                location.href="/course/pic?id="+data.result.cs_id;
              }
            }
          })
          return false;
        })
      }
    }
  })
})