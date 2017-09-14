/**
 * Created by hewan on 2017-09-11.
 */
require.config({
  //baseUrl设置的原则：大部分资源共享的目录
  baseUrl:"/views/assets",
  paths:{
    //如果要引入的模块是一个具名模块，那么这个别名一定要和具名模块的名称保持一致
    jquery: "./jquery/jquery",
    cookie: "./jquery-cookie/jquery.cookie",
    template: "./artTemplate/template",
    bootstrap:"./bootstrap/js/bootstrap",
    utils:"../static/js/lib/utils",
    form:"./jquery-form/jquery.form",
    nprogress:"./nprogress/nprogress",
    datepicker: "./bootstrap-datepicker/js/bootstrap-datepicker",
    datepickerCN: "./bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
    validate: "./jquery-validate/jquery-validate",
  },
  shim:{
    bootstrap:{
      //由于bootstrap不支持模块化，又需要依赖于jQuery
      deps:["jquery"]
    },
    datepickerCN: {
      deps: ["jquery"]
    },
    validate: {
      deps: ["jquery"]
    }
  }
})