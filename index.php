<?php 

	//用户在请求当前这个index.php的时候
	//使用的是如下的连接    http://www.bxg.com/index.php/模块名/文件名
	
	//我们可以是$_SERVER 获取到用户在后面输入的模块名和文件名

	//这里给$pathinfo一个默认的值，默认的路径
	$pathinfo = "/dashboard/index";

	//判断用户有没有在index.php后面跟上路径信息
	if(array_key_exists("PATH_INFO", $_SERVER)){
		//如果有传进来的路径信息，就使用传进来把我们的默认值给覆盖到
		$pathinfo = $_SERVER["PATH_INFO"];
	}

	//把获取到的路径信息，转换成数组
	//数组中的第一个元素，就是用户传进来的模块名
	//数组中的第二个元素，就是用户传进来的文件名
	$pathArr = explode("/", substr($pathinfo, 1));

	if(count($pathArr) == 2){
		//根据用户传进来的东西，动态的拼接文件路径，把文件include进来
		include "/views/".$pathArr[0]."/".$pathArr[1].".html";
	}else{
		include "/views/dashboard/".$pathArr[0].".html";
	}
 ?>