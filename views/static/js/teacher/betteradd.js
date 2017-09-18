/**
 * Created by hewan on 2017-09-14.
 */
  define (["jquery","template","utils","form", "datepicker", "datepickerCN","validate"],function ($,template,utils) {
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
    
    //使用日期选择插件
    $("input[name=tc_join_date]").datepicker({
      format: "yyyy-mm-dd",
      autoclose: true,
      language: "zh-CN"
    });
  
    //给表单注册验证事件
    $("form").validate({
      sendForm:false,
      onBlur:true,
      valid:function () {
        $(this).ajaxSubmit({
          success:function (data) {
            if(data.code==200){
              location.href="/teacher/list"
            }
          }
        })
      },
      description:{
        // data-required      设置当前表单项为必填
        // data-trim          设置在表单校验的时候去掉两端的空格
        // data-pattern       设置在表单校验的时候，表单值必须满足的正则表达式
        // data-conditional   设置条件验证的条件（函数）    函数在配置对象中的conditional对象中查找
        // data-description   设置当前表单项各种验证状态的提示信息， 在配置对象中的description对象中找
        // data-describedby   设置当前表单项各种验证状态的提示信息的显示位置 元素的id
        name:{
          required:"用户名不能为空"
        },
        password: {
          required: "密码不能为空",
          pattern: "请求输入6-15为数字或字母",
        },
        date:{
          required: "请选择入职时间"
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
    })
  }
  
  
  
  //给保存按钮注册点击事件
  // $(".body,.teacher").on("submit","form",function () {
  //   $(this).ajaxSubmit({
  //     success:function (data) {
  //       if(data.code==200){
  //         location.href="/teacher/list"
  //       }
  //     }
  //   })
  //   return false;
  // })
})