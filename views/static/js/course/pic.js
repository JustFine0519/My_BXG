/**
 * Created by hewan on 2017-09-17.
 */
define(["jquery","template","utils","uploadify","jcrop"],function ($,template,utils) {
  var cs_id=utils.getQueryObj().id;
  
  var x,y,w,h;
  var jcrop_api=null;
  
  $.ajax({
    url:"/api/course/picture",
    type:"get",
    data:{
      cs_id:cs_id
    },
    success:function (data) {
      if(data.code==200){
        var html=template("pic_tmp",data.result);
        $(".steps").html(html);
  
        $(".preview").on("cropstart cropmove", function(a, b, c){
          // console.log(c.x, c.y, c.h, c.w);
          x = c.x;
          y = c.y;
          h = c.h;
          w = c.w;
        })
        
        //图片上传插件的使用
        $("#upload-btn").uploadify({
          swf:"/views/assets/uploadify/uploadify.swf",
          uploader:"/api/uploader/cover",
          fileObjName:"cs_cover_original",
          formData:{cs_id:cs_id},
          buttonClass:"btn btn-success btn-sm",
          buttonText:"上传图片",
          width:70,
          height:30,
          //通过itemTemplate可以设置进度条信息显示的模板，不想要进度条信息，直接设置空标签即可
          itemTemplate:"<p></p>",
          onUploadSuccess:function (file,data,response) {
            data=JSON.parse(data);
            console.log(data);
            if(data.code==200){
              $(".preview>img").attr("src",data.result.path);
              
              //图片加载完成后，将裁切按钮的禁用状态移出
              $(".preview>img")[0].onload=function () {
                $("#crop-btn").prop("disabled",false);
              }
            }
            
            //如果用户之前已经点击过裁切按钮了，那么页面上肯定已经展示好了一个裁切的插件
            //我们需要在用户上传完图片之后，将之前展示的裁切插件删掉
            //需要用户重新点击裁切按钮，对新的图片进行裁切工作
            if(jcrop_api!=null){
              jcrop_api.destroy();
              
              $("#crop-btn").text("裁切图片").data("status","crop");
            }
          }
        });
        $("#upload-btn-button").css("line-height","1.5");
      }
    }
  })
  
  //给裁切按钮注册点击事件
  $(".steps").on("click", "#crop-btn", function(){
    
    if($(this).data("status") == "crop"){
      //调用jcrop插件
      $(".preview>img").Jcrop({
        setSelect: [0, 0, 400, 200],
        aspectRatio: 2,
        boxWidth: 400
      }, function(){
        jcrop_api = this;
        thumbnail = this.initComponent('Thumbnailer', { width: 240, height: 120, container: ".thumb" });
      });
      
      $(".thumb>img").remove()
      
      //将当前按钮设置成保存按钮
      $(this).text("保存图片");
      $(this).data("status", "save")
    }else{
      //向后台发送请求，保存当前裁切的图片
      console.log(x, y, w, h);
      $.ajax({
        url: "/api/course/update/picture",
        type: "post",
        data: {
          cs_id: cs_id,
          x: x,
          y: y,
          w: w,
          h: h
        },
        success: function(data){
          if(data.code == 200){
            //跳转到下一步，课时管理
            location.href = "/course/lessons?id=" + data.result.cs_id;
          }
        }
      })
    }
    
  })
})