/*! sy 2015-03-17 */
$(function(){function a(){b(function(){c()})}function b(a){$.ajax({url:d("/w/view_onemovie.do"),dataType:"jsonp",success:function(b){var c=b.res.data,d=_.template($("#J-tmpl-page").html());$("#J-page-container").html(d(c)),$(".J-intro-show").on("click",function(){var a=$(this).parents(".intro-txt");a.hasClass("intro-txt-auto")?a.removeClass("intro-txt-auto"):a.addClass("intro-txt-auto")}),a&&a()},error:function(){}})}function c(){$.ajax({url:HOST+"/w/view_onemoviecommentlist.do",dataType:"jsonp",data:{id:f,type:0,lastId:0},success:function(a){var b=a.res.data,c=_.template($("#J-comments-tmpl").html());$("#J-comments-container").html(c(b))},error:function(){}}),$.ajax({url:HOST+"/w/view_onemoviecommentlist.do",dataType:"jsonp",data:{id:f,type:50,lastId:0},success:function(a){var b=a.res.data,c=_.template($("#J-comments-best-tmpl").html());$("#J-comments-best-container").html(c(b))},error:function(){}})}function d(a){return HOST+a+g}function e(a,b){var c=new RegExp("(^|&)"+a+"=([^&]*)(&|$)","i"),d=location.search.substr(1).match(c);return b&&d?escape(d[2]):""}var f,g=location.search;f=e("id",g),a()});