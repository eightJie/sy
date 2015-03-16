$(function() {
	var HOST = 'http://pre.duyao001.com';

	init();

	function init() {
		initPage(function() {

			initSwiper();

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

				back && back();
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
		return HOST + url + location.search;
	}
});