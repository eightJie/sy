/*! sy 2015-03-18 */
$(function(){function a(){b(function(){c()})}function b(a){$.ajax({url:d("/w/view_onebookdigest.do"),dataType:"jsonp",data:{page:0,type:27,lastId:0},success:function(b){var c=b.res.data,d=_.template($("#J-tmpl-page").html());$("#J-page-container").html(d(c)),a&&a()},error:function(){}})}function c(){function a(a){$("#swiper-num").html("<i>"+(a.activeIndex+1)+"</i><i>/</i><i>"+a.slides.length+"</i>")}function b(){var b=+$(this).attr("order");e.css("display","block"),f.css("display","none"),d=new Swiper(".swiper-container",{lazyLoading:!0,loop:!1,onSlideChangeEnd:function(){a(d)}}),d.activeIndex=b,d.onResize(),a(d),e.on("touchstart",function(a){var b,d=a.changedTouches[0].pageX,f=!1;e.on("touchmove",function(a){a.changedTouches.length>1&&(f=!0,e.off("touchmove"))}),e.on("touchend",function(a){b=a.changedTouches[a.changedTouches.length-1].pageX,Math.abs(b-d)<2&&!f&&c()})})}function c(){e.off("touchstart"),e.off("touchmove"),e.off("touchend"),d.destroy(),d=null,f.css("display","block"),e.css("display","none")}var d,e=$(".swiper-container"),f=$("#J-imgs");f.delegate(".J-item","tap",b)}function d(a){return HOST+a+location.search}a()});