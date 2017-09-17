/**
 * Created by hewan on 2017-09-16.
 */
define(["jquery","template"],function ($,template) {
  $.ajax({
    url: "/api/course",
    success: function(data){
      if(data.code == 200){
        console.log(data);
        var html = template("course_list_tmp", data);
        $(".courses").html(html);
      }
    }
  })
})