define('cmp/toast', (require, exports, module) => {
		function toast(options) {
			options = options || {};
			clearTimeout(timeout);
			var defaultParam = {
				content: 'toast',
				width: 100,
				height: 40,
				backgroundColor: '#23bfb1',
				color: '#fff',
				time: 2
			};
			options = $.extend(defaultParam, options);

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
