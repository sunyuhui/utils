/**
 * @author sunhui04
 */


/**
 * [exports 判断变量数据类型]
 * @param  {[type]} value [要判断的变量]
 * @return {[type]}       [构造函数形式的类型]
 *  "Object"
	"Number"
	"Function"
	"Undefined"
	"Null"
	"String"
	"Boolean"
 */
module.exports = function(value) {
	let type = Object.prototype.toString.call(value);
	// type : '[object Number]'
	return type.slice(8, type.length-1);
}