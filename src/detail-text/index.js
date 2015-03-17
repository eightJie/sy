$(function() {
	var search = location.search;
	var id;

	id = getParam('id', search);

	init();

	function init() {
		initPage(function() {

			initSwiper();
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
				type: 3
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
				type: 1,
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
				type: 2,
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

	function initSwiper() {
		var $layer = $('.swiper-container');
		var $imgs = $('#J-imgs');
		var mySwiper;


		$imgs.delegate('.J-item', 'tap', show);

		function show() {
			var i = +$(this).attr('order');

			$layer.css('display', 'block');
			$imgs.css('display', 'none');

			mySwiper = new Swiper('.swiper-container', {
				lazyLoading: true,
				loop: false
			});
			mySwiper.activeIndex = i;
			mySwiper.onResize();

			$layer.on('touchstart', function(evt) {
				var pageX = evt.changedTouches[0].pageX;
				var pageXEnd;
				var moreTouch = false;

				$layer.on('touchmove', function(evt) {
					if (evt.changedTouches.length > 1) {
						moreTouch = true;
						$layer.off('touchmove');
					}
				});
				$layer.on('touchend', function(evt) {
					pageXEnd = evt.changedTouches[evt.changedTouches.length - 1].pageX;
					if (Math.abs(pageXEnd - pageX) < 2 && !moreTouch) {

						hide();

					}
				});
				// evt.preventDefault();
			});
		}

		function hide() {
			$layer.off('touchstart');
			$layer.off('touchmove');
			$layer.off('touchend');

			mySwiper.destroy();
			mySwiper = null;
			$imgs.css('display', 'block');
			$layer.css('display', 'none');
		}
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