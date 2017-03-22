// test for summary reducer
const assert = require('assert');
const deepFreeze = require('deep-freeze');
import summary from '../client/src/reducers/summary.jsx';

describe('summary', function () {
  var resultState = {user:[{name:'tester'}],clicks:[{'id':'121'}],questions:[{question:"is this working"}]},
  testState = {};
  deepFreeze(testState);
  describe('UNDEFINED ACTION', function(){
    it('should return default state if action is undefined', function () {
      assert.deepEqual(testState, summary(testState, {type: 'TEST'}));
    });
  });
  xdescribe('UPDATE_SUMMARY', function(){
    it('should update the value of the state', function () {
      assert.deepEqual(resultState, summary(testState, {type: 'UPDATE_SUMMARY', summary:{user:[{name:'tester'}],clicks:[{'id':'121'}],questions:[{question:"is this working"}]}}));
    });
  });

});
