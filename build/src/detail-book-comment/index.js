/*! sy 2015-03-17 */
$(function(){function a(){b(function(){c(),d(),$("#J-tab-nav>li").on("click",function(){var a=$(this),b=a.attr("id").match(/\d+/)[0],c=$("#tab-content-"+b);a.parent().children().removeClass("active"),a.addClass("active"),$("#J-tab-content").children().css("display","none"),c.css("display","block")})})}function b(a){$.ajax({url:HOST+"/w/view_oneresourcecomment.do",dataType:"jsonp",data:{id:f,type:6},success:function(b){var c=b.res.data,d=_.template($("#J-tmpl-page").html());$("#J-page-container").html(d(c)),a&&a()},error:function(){}})}function c(){$.ajax({url:HOST+"/w/view_onecommentlist.do",dataType:"jsonp",data:{id:f,type:0,lastId:0},success:function(a){var b=a.res.data,c=_.template($("#J-comments-tmpl").html());$("#J-comments-num").html(b.list.length),$("#tab-content-1").html(c(b))},error:function(){}})}function d(){$.ajax({url:HOST+"/w/view_onecommentlist.do",dataType:"jsonp",data:{id:f,type:1,lastId:0},success:function(a){var b=a.res.data,c=_.template($("#J-favours-tmpl").html());$("#J-favours-num").html(b.list.length),$("#tab-content-2").html(c(b))},error:function(){}})}function e(a,b){var c=new RegExp("(^|&)"+a+"=([^&]*)(&|$)","i"),d=location.search.substr(1).match(c);return b&&d?escape(d[2]):""}var f,g=location.search;f=e("id",g),a()});