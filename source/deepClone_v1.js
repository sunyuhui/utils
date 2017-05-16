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
			} else {
				clonedData[key] = data[key];
			}
		}
		return clonedData;
	}

}

//对象属性依赖成环
var a = {};
var b = {};
a.b = b;
b.a = a;

var target = deepClone(a);
console.log(target);
// module.exports = deepClone;