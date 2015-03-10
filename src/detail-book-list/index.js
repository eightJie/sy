$(function() {
	var HOST = 'http://pre.duyao001.com';
	var paramStr = location.search;
	var id, page, uid;

	id = getParam('id', paramStr);
	page = getParam('page', paramStr);
	uid = getParam('uid', paramStr);

	$.ajax({
		url: getUrl('/w/view_onebooklist/'),
		dataType: 'jsonp',
		success: function(result) {
			var data = result.res.data;
			var tpl = _.template($('#J-tmpl-page').html());

			$('#J-page-container').html(tpl(data));
		},
		error: function() {}
	});

	function getUrl(url) {
		return HOST + url + id + '/' + page + '/' + uid;
	}

	function getParam(name, search) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = location.search.substr(1).match(reg);

		if (search && r) {
			return escape(r[2]);
		} else {
			return '';
		}
	}

});