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
		options = extend({
			pageSize: PAGE_SIZE,
			currentPage: CURRENT_PAGE
		}, options);

		var paginationStr = getPage(options.currentPage, options.totalPage);

		var paginationContainer = document.getElementsByClassName('pagination-container')[0];
		paginationContainer.innerHTML = paginationStr;

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
			pageStr = '<a class="prePage test">上一页</a><a>1</a>' + pageStr;
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
		var paginationContainer = document.getElementsByClassName('pagination-container')[0];
		bind(paginationContainer, 'click', function(e) {

			var e = window.event || event;
			element = e.srcElement ? e.srcElement : e.target;

			if(element && element.nodeName.toUpperCase() === 'A') {
				var pageNum;
				var currentPage = +paginationContainer.getElementsByClassName('active')[0].innerText;
				if( hasClass(element, 'prePage') ) {
					//点击【上一页】
					pageNum = currentPage - 1;
				} else if( hasClass(element, 'lastPage') ) {
					//点击【下一页】
					pageNum = currentPage + 1;
				} else {
					pageNum = +element.innerText;
				}

				sendAjax(options, pageNum);
			}
		});
	}

	/**
	 * [extend deep clone]
	 * @param  {[Object]} target   [target]
	 * @param  {[Object]} original [original]
	 * @return {[Object]}          [target]
	 */
	function extend(target, original) {
		for(var i in original) {
			target[i] = original[i];
		}
		return target;
	}

	/**
	 * [bind 绑定事件函数，兼容标准与非标准]
	 * @return {[type]} [description]
	 */
	function bind(element, type, fun) {
		if(element.addEventListener) {
			return element.addEventListener(type, fun, false);
		} else {
			return element.attach('on' + type, fun);
		}
	}

	/**
	 * [hasClass 是否具有某个className]
	 * @param  {[type]}  element   [description]
	 * @param  {[type]}  className [description]
	 * @return {Boolean}           [description]
	 */
	function hasClass(element, className) {
		var classList = element.className;
		if(classList && (classList.indexOf(className) !== -1)) {
			return true;
		}
	}

	/**
	 * [sendAjax 发送Ajax请求]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	function sendAjax(options, pageNum) {
		options.beforeCallback && options.beforeCallback();
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
		  if (xhr.readyState === 4) {
		  	options.afterCallback && options.afterCallback();
		    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
		      //执行回调
		      options.callback && options.callback();
		      //更新页码
		      var pageHtml = getPage(pageNum, options.totalPage);
			  paginationContainer.innerHTML = pageHtml;
		    } else {
		      alert('Request was unsuccessful: ' + xhr.status);
		    }
		  }
		};
		xhr.open(options.type, options.url, true);
		xhr.send(options.data);
	}

	module.exports = init
});