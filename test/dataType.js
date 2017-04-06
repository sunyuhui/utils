/**
 * @author sunyuhui
 */

var checkType = require('../source/dataType');

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

var dataString = 'sunyuhui';

// check String
describe('String', function() {
	describe('checkType', function() {
		it('should return String when the type of value is String', function() {
			assert.equal('String', checkType(dataString));
			expect(checkType(dataString)).to.equal('String');
			checkType(dataString).should.equal('String');
		});
	});
})