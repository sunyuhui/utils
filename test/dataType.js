/**
 * @author sunyuhui
 */

var checkType = require('../source/dataType');

var assert = require('chai').assert;

var dataString = 'sunyuhui';

// check String
describe('String', function() {
	describe('checkType', function() {
		it('should return String when the type of value is String', function() {
			assert.equal('String', checkType(dataString));
		});
	});
})