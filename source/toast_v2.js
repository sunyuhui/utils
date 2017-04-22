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

			//参数为字符串时，将其作为content属性值
			if(Object.prototype.toString.call(options) === '[object String]') {
				options = $.extend(defaultParam, {
					content: options
				});
			} else if(Object.prototype.toString.call(options) === '[object Object]') {
				options = $.extend(defaultParam, options);
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


			var elementContent = '<div class="toast-container" style="' + style + '"> <span class="toast-content"> ' + options.content + ' </span> </div>';
			$('body').append(elementContent);
			//一定时间后消失
			var timeout = setTimeout(function() {
				$('.toast-container').remove();
			}, options.time*1000);
		}
		module.exports = {
			toast: toast
		}
	});
