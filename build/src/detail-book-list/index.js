/*! sy 2015-03-17 */
$(function(){function a(){b()}function b(){$.ajax({url:c("/w/view_onebooklist.do"),dataType:"jsonp",success:function(a){var b=a.res.data,c=_.template($("#J-tmpl-page").html());$("#J-page-container").html(c(b))},error:function(){}})}function c(a){return HOST+a+location.search}a()});