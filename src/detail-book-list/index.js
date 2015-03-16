$(function() {
	var HOST = 'http://pre.duyao001.com';

	init();

	function init() {
		initPage();
	}

	function initPage() {
		$.ajax({
			url: getUrl('/w/view_onebooklist.do'),
			dataType: 'jsonp',
			success: function(result) {
				var data = result.res.data;
				var tpl = _.template($('#J-tmpl-page').html());

				$('#J-page-container').html(tpl(data));
			},
			error: function() {}
		});

	}

	function getUrl(url) {
		return HOST + url + location.search;
	}

});