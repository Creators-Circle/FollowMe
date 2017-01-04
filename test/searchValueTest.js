// test for searchValue reducer
const assert = require('assert');
import search from '../client/src/reducers/searchValue.jsx';

describe('searchValue', function () {
  var testState = "search";
  describe('UNDEFINED ACTION', function(){
    it('should return default state if action is undefined', function () {
      assert.deepEqual(testState, search(testState, {type: 'TEST'}));
    });
  });
  describe('UPDATE_SEARCH_VALUE', function(){
    it('should update the value of the state ', function () {
      assert.deepEqual(testState, search('', {type: 'UPDATE_SEARCH_VALUE', value: "search"}));
    });
  });

});
