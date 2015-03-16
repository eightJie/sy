$(function() {
	var HOST = 'http://pre.duyao001.com';
	var search = location.search;
	var id;

	id = getParam('id', search);

	init();

	function init() {
		initPage(function() {

			initComments();
			initFavours();

			$('#J-tab-nav>li').on('click', function(e) {
				var nav = $(this);
				var order = nav.attr('id').match(/\d+/)[0];
				var content = $('#tab-content-' + order);

				nav.parent().children().removeClass('active');
				nav.addClass('active');
				$('#J-tab-content').children().css('display', 'none');
				content.css('display', 'block');
			});

		});
	}

	function initPage(back) {
		$.ajax({
			url: HOST + '/w/view_oneresourcecomment.do',
			dataType: 'jsonp',
			data:{
				id: id,
				type: 6
			},
			success: function(result) {
				var data = result.res.data;
				var tpl = _.template($('#J-tmpl-page').html());

				$('#J-page-container').html(tpl(data));
				back && back();
			},
			error: function() {}
		});
	}

	function initComments() {
		$.ajax({
			url: HOST + '/w/view_onecommentlist.do',
			dataType: 'jsonp',
			data: {
				id: id,
				type: 0,
				lastId: 0
			},
			success: function(result) {
				var data = result.res.data;
				var tpl = _.template($('#J-comments-tmpl').html());

				$('#J-comments-num').html(data.list.length);
				$('#tab-content-1').html(tpl(data));
			},
			error: function() {}
		});
	}

	function initFavours() {
		$.ajax({
			url: HOST + '/w/view_onecommentlist.do',
			dataType: 'jsonp',
			data: {
				id: id,
				type: 1,
				lastId: 0
			},
			success: function(result) {
				var data = result.res.data;
				var tpl = _.template($('#J-favours-tmpl').html());

				$('#J-favours-num').html(data.list.length);
				$('#tab-content-2').html(tpl(data));
			},
			error: function() {}
		});
	}


	function getUrl(url) {
		return HOST + url + search;
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