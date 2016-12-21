var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return the index when the value is present', function() {
      assert.equal(0, [1,2,3].indexOf(1));
    });
  });
});