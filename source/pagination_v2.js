/**
 * 分页组件
 */

define('cmp/pagination', function(require,exports, module) {
	//定义一些options的常量
	var PAGE_SIZE = 10;
	var CURRENT_PAGE = 1;

	//初始化函数 ，对外暴露
	function init(options) {
		options = options || {};
		options = $.extend({
			pageSize: PAGE_SIZE,
			currentPage: CURRENT_PAGE,
			type: 'GET'
		}, options);

		var paginationStr = getPage(options.currentPage, options.totalPage);
		$('.pagination-list').html(paginationStr);

		bindEvent(options);

	}
	/**
	 * [getPage 获取页码展示]
	 * @param  {[type]} currentPage [当前页码]
	 * @param  {[type]} totalPage  [页码总数]
	 * @return {[type]}             [description]
	 */
	function getPage(currentPage, totalPage) {
		//显示：第一页，当前页，当前页的前后两页，最后一页
		//以当前页为分割点，分别得到当前页前面的页码和后面的页码
		var pageStr = '<a class="active">' + currentPage + '</a>';
		// 将当前页前后2页的页码展示出来
		for(var i = 1; i<=2; i++) {
			//得到当前页前两页的的页码
			//其中的1指第一页
			if(currentPage > i+1) {
				pageStr = '<a>' + (currentPage - i) + '</a>' + pageStr;
			}
			//得到当前页后两页的页码
			if(currentPage+i < totalPage) {
				pageStr = pageStr + '<a>' + (currentPage + i) + '</a>';
			}
		}
		//得到当前页前面用...表示的页码
		//两个1分别表示第一页，和当前页
		if( currentPage > 2+1+1 ) {
			pageStr = ' ... ' + pageStr;
		}

		//得到上一页
		if(currentPage > 1) {
			pageStr = '<a class="prePage">上一页</a><a>1</a>' + pageStr;
		}

		//得到当前页后面用...表示的页码
		//其中1表示最后一页，当前页已经在前面计算过，这里不再计算
		if( currentPage+2+1 < totalPage ) {
			pageStr = pageStr + ' ... ';
		}

		//得到下一页
		if( currentPage < totalPage ) {
			pageStr = pageStr + '<a>' + totalPage + '</a><a class="lastPage">下一页</a>';
		}

		return pageStr;
	}

	/**
	 * [bindEvent 绑定事件]
	 * @param  {[type]} options [初始化时]
	 * @return {[type]}       [description]
	 */
	function bindEvent(options) {
		$(document).off('click', '.pagination-list a').on('click', '.pagination-list a', function() {
			var $this = $(this);
			var pageNum;
			var currentPage = +$('.pagination-list a.active').text();
			if( $this.hasClass('prePage') ) {
				//点击【上一页】
				pageNum = currentPage - 1;
			} else if( $this.hasClass('lastPage') ) {
				//点击【下一页】
				pageNum = currentPage + 1;
			} else {
				pageNum = +$this.text();
			}
			//获取表格数据
			//执行ajax之前的回调函数，比如加个loading
			options.beforeCallback && options.beforeCallback();
			$.ajax({
				url:options.url,
				type: options.type,
				data: options.data
			}).done(function(res){
				//执行ajax之后的回调函数，比如隐藏loading
				options.afterCallback && options.afterCallback();
				//请求成功后的回调函数
				options.callback && options.callback(res);
				// 更新页码
				var pageHtml = getPage(pageNum, options.totalPage);
				$('.pagination-list').html(pageHtml);
			}).fail(function(error){
				//执行ajax之后的回调函数，比如隐藏loading
				options.afterCallback && options.afterCallback();
				alert('请求出错，请重试');
			});

		});
	}

	module.exports = init
});