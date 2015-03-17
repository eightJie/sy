$(function() {
	var search = location.search;
	var id, type;

	id = getParam('id', search);
	type = getParam('type', search);

	init();

	function init() {
		exportData();

		initPage(function() {
			initSummary();
			initComments();

		});
	}

	function exportData() {
		window.d = {
			id: id,
			showImg: function(url) {
				url = url || 'imgs/default.png';
				return ' style="background-image:url(' + url + ');" ';
			}
		};
	}

	function initPage(back) {
		$.ajax({
			url: getUrl('/w/view_onebook.do'),
			dataType: 'jsonp',
			data: {
				type: type
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

	//书摘
	function initSummary() {
		$.ajax({
			url: HOST + '/w/view_onebookdigest.do',
			dataType: 'jsonp',
			data: {
				id: id,
				page: 0,
				lastId: 0
			},
			success: function(result) {
				var data = result.res.data;
				var tpl = _.template($('#J-summary-tmpl').html());

				$('#J-summary-container').html(tpl(data));
			},
			error: function() {}
		});
	}

	//评论
	function initComments() {
		new loadingPage('#J-comments-container', '#J-comments-tmpl', function(pageNum, lastId, back) {
			$.ajax({
				url: HOST + '/w/view_onebookcommentlist.do',
				dataType: 'jsonp',
				data: {
					id: id,
					// page: 0,
					type: 0,
					lastId: lastId
				},
				success: function(result) {
					var data = result.res.data;

					$('#J-comments-total').html(data.total || data.list.length);
					back && back(data.list);
				},
				error: function() {}
			});
		}).start();
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


(function(win) {
	var $win = $(win),
		lastScrollY = win.scrollY,
		winH = $win.height();


	function loadingPage(container, tmplId, getData) {
		this.container = $(container);
		this.$tmpl = $(tmplId);
		this.getData = getData;
		this.pageNum = 1;
		this.loading = false;
	}

	loadingPage.prototype = {
		start: function() {
			var ths = this;

			ths._getData();
			this._addEvents();
		},
		_addEvents: function() {
			var ths = this;

			// $win.on('scroll', function() {
			// 	ths._scroll();
			// });
		},
		_scroll: function() {
			var ths = this;
			var scrollY = win.scrollY,
				dir;
			// var containerY = ths.container.offset().top,
			// 	containerH = ths.container.height(),
			// 	containerShowH = scrollY + winH - containerY;
			var isBottom = scrollY >= $(document).height() - winH;

			if (scrollY > lastScrollY) {
				dir = 'up';
			} else {
				dir = 'down';
			}
			lastScrollY = scrollY;

			// if (!ths.loading && dir == 'up' && containerShowH > 0 && containerShowH / containerH > 0.8) {
			if (!ths.loading && dir == 'up' && isBottom) {
				ths._getData();
			}
		},
		_getData: function() {
			var ths = this;
			var pageNum = ths.pageNum;
			var lastId = ths.lastId || 0;

			if (ths.loading) {
				return false;
			}
			ths.loading = true;
			ths.getData(pageNum, lastId, function(data) {
				ths.loading = false;
				ths.lastId = data[data.length - 1].ridStr;

				ths.container.append(_.template(ths.$tmpl.html())({
					list: data
				}));
			});
		}
	};

	win.loadingPage = loadingPage;
})(window);