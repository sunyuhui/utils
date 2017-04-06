/**
 * @author sunhui04
 */


/**
 * [exports value]
 * @param  {} value [value]
 * @return {[String]}       [type of value]
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