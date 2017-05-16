var dataType = require('./dataType');

function deepClone(data) {
	//基本类型直接赋值，引用类型做递归处理
	var type = dataType(data);
	var baseType = ['Number', 'Undefined', 'Null', 'String', 'Boolean'];
	var clonedData;

	//基本类型
	if(baseType.indexOf(type) !== -1) {
		return data;
	} else {
		//引用类型
		var clonedData;
		clonedData = dataType(data[key]) === 'Array' ? [] : {};
		for(var key in data) {
			if( dataType(data[key]) === 'Array' || dataType(data[key]) === 'Object' ) {
				clonedData[key] = deepClone(data[key]);
			} else if( dataType(data[key]) === 'Function' ) {
				var source = data[key].toString();
				source = new Function('return ' + source);
				var target = source();
				clonedData[key] = target;
			}
			else {
				clonedData[key] = data[key];
			}
		}
		return clonedData;
	}

}

module.exports = deepClone;