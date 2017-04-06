/**
 * @author sunyuhui
 */

module.exports = function(value) {
	if( value 
		&& (typeof value === 'object' || typeof value === 'function')
		&& typeof value.then === 'function') {
		return true;
	}
}