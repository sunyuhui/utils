define('cmp/toast', (require, exports, module) => {
	function toast(options) {
		clearTimeout(timeout);
		var defaultParam = {
			content: 'toast',
			width: 100,
			height: 40,
			backgroundColor: '#23bfb1',
			color: '#fff',
			time: 2
		};

		if(Object.prototype.toString.call(options) === '[object String]') {
			// options = $.extend(defaultParam, {
			// 	content: options
			// });
			options = extend(defaultParam, {
				content: options
			});
		} else if(Object.prototype.toString.call(options) === '[object Object]') {
			// options = $.extend(defaultParam, options);
			options = extend(defaultParam, options);
		} else {
			console.error('only support String or Object for param');
			return;
		}

		var style =
			'position: absolute;' +
			'width:' + options.width + 'px;' +
			'height:' + options.height + 'px;' +
			'line-height:' + options.height + 'px;' +
			'top:50%;' +
			'margin-top:' + (-options.height/2) + 'px;' +
			'left:50%;' +
			'margin-left:' + (-options.width/2) + 'px;' +
			'border-radius:5px;' +
			'z-index:9999;' +
			'text-align: center;' +
			'background-color:' + options.backgroundColor + ';' +
			'color:' + options.color + ';';


		// var elementContent = '<div class="toast-container" style="' + style + '"> <span class="toast-content"> ' + options.content + ' </span> </div>';
		// $('body').append(elementContent);
		
		var divNode = document.createElement('div');
		divNode.setAttribute('class', 'toast-container');
		divNode.setAttribute('style', style);

		var spanNode = document.createElement('span');
		spanNode.innerHTML = options.content;

		divNode.appendChild(spanNode);

		document.body.appendChild(divNode);

		var timeout = setTimeout(function() {
			// $('.toast-container').remove();
			document.body.removeChild(document.getElementsByClassName('toast-container')[0]);
		}, options.time*1000);
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
	module.exports = {
		toast: toast
	}
});
