$(function() {
	var search = location.search;
	var id;

	id = getParam('id', search);

	init();

	function init(){
		initPage(function(){

			initComments();

		});
	}

	function initPage(back) {
		$.ajax({
			url: getUrl('/w/view_onemovie.do'),
			dataType: 'jsonp',
			success: function(result) {
				var data = result.res.data;
				var tpl = _.template($('#J-tmpl-page').html());

				$('#J-page-container').html(tpl(data));
				$('.J-intro-show').on('click', function() {
					var parent = $(this).parents('.intro-txt');

					if (parent.hasClass('intro-txt-auto')) {
						parent.removeClass('intro-txt-auto');
					} else {
						parent.addClass('intro-txt-auto');
					}

				});

				back &&  back();
				
			},
			error: function() {}
		});
	}

	function initComments() {
		//普通人
		$.ajax({
			url: HOST + '/w/view_onemoviecommentlist.do',
			dataType: 'jsonp',
			data: {
				id: id,
				type: 0,
				lastId: 0
			},
			success: function(result) {
				var data = result.res.data;
				var tpl = _.template($('#J-comments-tmpl').html());

				$('#J-comments-container').html(tpl(data));
			},
			error: function() {}
		});

		//神人
		$.ajax({
			url: HOST + '/w/view_onemoviecommentlist.do',
			dataType: 'jsonp',
			data: {
				id: id,
				type: 50,
				lastId: 0
			},
			success: function(result) {
				var data = result.res.data;
				var tpl = _.template($('#J-comments-best-tmpl').html());

				$('#J-comments-best-container').html(tpl(data));
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
