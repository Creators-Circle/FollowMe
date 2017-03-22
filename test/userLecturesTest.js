// test for userLectures reducer
const assert = require('assert');
const deepFreeze = require('deep-freeze');
import lectures from '../client/src/reducers/userLectures.jsx';

describe('userLectures', function() {
  var testState = [];
  deepFreeze(testState);
  var resultState = [{id:'1232ds', name:'test presentation', date: '2017-01-03 22:58:04.039861+00'}];

  describe('UNDEFINED ACTION', function(){
    it('should return default state if action is undefined', function () {
      assert.deepEqual(testState, lectures(testState, {type: 'TEST'}));
    });
  });
  describe('STORE_USER_LECTURES', function() {
    xit('should add new lectures', function() {
      assert.deepEqual(resultState, lectures(testState,
        {type:'STORE_USER_LECTURES',
        lectures:[{id:'1232ds', name:'test presentation', date: '2017-01-03 22:58:04.039861+00'}]}));
    });
  });
});
