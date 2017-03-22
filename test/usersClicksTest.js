const assert = require('assert');
const deepFreeze = require('deep-freeze');
import usersClicks from '../client/src/reducers/usersClicks';

  describe('usersClicks', function () {
    var resultState = {Ari: [9, 5, 6], Ross: [5], Christian: []},
    testState = {};
    deepFreeze(testState);

    describe('undefined parameters', function () {
      it('should return state if action.type is undefined', function(){
        assert.deepEqual(testState, usersClicks(testState, {type:'ARGLEBARGLE', user:'Ari', time: 10}) )
      });

      it('should return state if action.user is not a proper name value', function(){
        assert.deepEqual(testState, usersClicks(testState, {type:'ADDCLICKTOUSER', user:99, time: 10}) )
      });

      it('should return state if action.time is undefined', function(){
        assert.deepEqual(testState, usersClicks(testState, {type:'ADDCLICKTOUSER', user:'Ari', time: undefined}) )
      });
    });

    it('should add a click to a user\'s clicks array if a user is specified', function() {
      testState = {Ari: [9, 5, 6], Ross: [5], Christian: []};
      assert.equal(4, usersClicks(testState, {type:'ADDCLICKTOUSER', user:'Ari', time: 10}).Ari.length)
    });

    it('should add a user to state on their first click', function() {
      resultState = {Ari: [10]};
      testState = {};
      assert.deepEqual(resultState, usersClicks(testState, {type:'ADDCLICKTOUSER', user:'Ari', time: 10}) );
    });
  });
