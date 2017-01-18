const assert = require('assert');
const deepFreeze = require('deep-freeze');
import  user  from '../client/src/reducers/userReducer.jsx';

describe('userReducer', function() {
  var testState = {},
  resultState = {name:"Alice", email: "alice@y.com",role:'presenter', avatar:"alice_photo", id:"a056fe6"};
  deepFreeze(testState);

  describe('UNDEFINED ACTION', function(){
    it('should return default state if action is undefined', function () {
      assert.deepEqual(testState, user(testState, {type: 'TEST'}));
    });
  });

  describe('STORE_USER', function () {
    it('should store user\'s information', function () {
      assert.deepEqual(resultState,
        user(testState, {type: 'STORE_USER',name:"Alice", email: "alice@y.com", role:'presenter', avatar:"alice_photo", id:"a056fe6"}));
    });
  });

  describe('CHANGE_ROLE', function () {
    it('should change the role of the user', function() {
      testState = {name:"Alice", email: "alice@y.com",role:'audience', avatar:"alice_photo", id:"a056fe6"};
      assert.deepEqual(resultState,
        user(testState,
        {type: 'CHANGE_ROLE', role: 'presenter'}));
    });

    it('should not accept other roles aside from presenter or audience', function() {
      testState = {name:"Alice", email: "alice@y.com",role:'presenter', avatar:"alice_photo", id:"a056fe6"}
      assert.deepEqual(testState, user( testState,
      {type: 'CHANGE_ROLE', role:'scrum master'}))
    })
  });
});
