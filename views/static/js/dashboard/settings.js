/**
 * Created by hewan on 2017-09-14.
 */
define(["jquery", "ckeditor", "template", "region","uploadify",  "datepicker", "datepickerCN","validate","form","cookie"], function($, CKEDITOR,template){
  $(function(){
    
    $.ajax({
      url:"/api/teacher/profile",
      success:function (data) {
        if(data.code==200){
          var html = template("settings_tmp", data.result);
          $(".settings").html(html);
          
          //富文本编辑器
          CKEDITOR.replace("tc_introduce", {
            toolbarGroups : [
              { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
              { name: 'insert' },
              { name: 'tools' },
              { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            ]
          });
  
          //使用日期选择插件
          $("input[name=tc_join_date]").datepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            language: "zh-CN"
          });
          $("input[name=tc_birthday]").datepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            language: "zh-CN"
          });
  
          //表单验证
          $("form").validate({
            sendForm:false,
            onBlur:true,
            onChange: true,
            description:{
              roster:{
                required:"花名不能为空"
              },
              birthday:{
                required: "请选择出生日期"
              },
              moblie:{
                required: "手机号不能为空"
              },
              email:{
                required: "email不能为空"
              },
              joindate:{
                required: "请选择入职日期"
              }
            },
            eachValidField: function(){
              //只要有表单项被校验并且通过验证，就会调用
              this.parent().parent().addClass("has-success").removeClass("has-error");
            },
            eachInvalidField: function(){
              //只要有表单项被校验并且不通过验证，就会调用
              this.parent().parent().addClass("has-error").removeClass("has-success");
            }
          });
  
          //省级联动插件
          $("#region").region({
            url: "/views/assets/jquery-region/region.json"
          });
  
          //图片上传插件的使用
          $("#upfile").uploadify({
            swf: "/views/assets/uploadify/uploadify.swf",
            uploader: "/api/uploader/avatar",
            fileObjName: "tc_avatar",
            width: 120,
            height: 120,
            buttonText: "",
            onUploadSuccess: function (file, data, response) {
              data = JSON.parse(data);
              if (data.code == 200) {
                $(".preview img").attr("src", data.result.path);
  
                var userinfo = JSON.parse($.cookie("userinfo"));
                userinfo.tc_avatar=data.result.path;
                $.cookie("userinfo",JSON.stringify(userinfo),{expires: 365, path: "/"});
              }
            }
          });
  
          //保存按钮的点击事件
          $("#btn-save").click(function () {
            CKEDITOR.instances.tc_introduce.updateElement();

            $("form").ajaxSubmit({
              url:"/api/teacher/modify",
              type:"post",
              success:function (data) {
                if(data.code==200){
                  alert("修改成功");
                  location.href="/dashboard/settings"
                }
              }
            })
            return false;
          })
        }
      }
    })
  
    
    
  
  })
})