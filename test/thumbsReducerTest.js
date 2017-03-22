const assert = require('assert');
const deepFreeze = require('deep-freeze');
import  thumbsReducer  from '../client/src/reducers/thumbsReducer.jsx';

describe('thumbsReducer', function() {
  var testState = {
    topicId: '1234',
    displayed: false,
    up: 0,
    down: 0,
    side: 0
  },
  resultState;
  
  deepFreeze(testState);
  describe('UNDEFINED ACTION', function(){
    it('should return default state if action is undefined', function () {
      assert.deepEqual(testState, thumbsReducer(testState, {type: 'TEST'}));
    });
  });

  describe('SET_TOPIC_ID', function () {
    it('should change the value of topicId to the provided uuid', function() {
      resultState = {topicId: '323242', topicName: 'ArgleBargle', displayed: false, up: 0, down: 0, side: 0};
      assert.deepEqual(resultState,
        thumbsReducer(testState,
        {type: 'SET_TOPIC', topicId: '323242', topicName: 'ArgleBargle'}));
    });
  });

  describe('THUMB_CLICKED', function () {
    it('should increment the specific thumbChoice included in the action - up', function() {
      resultState = {topicId: 1234, displayed: false, up: 1, down: 0, side: 0};
      assert.deepEqual(resultState,
        thumbsReducer(testState,
        {type: 'THUMB_CLICKED', thumbChoice: 'up'}));
    });
    it('should increment the specific thumbChoice included in the action - down', function() {
      resultState = {topicId: 1234, displayed: false, up: 0, down: 1, side: 0};
      assert.deepEqual(resultState,
        thumbsReducer(testState,
        {type: 'THUMB_CLICKED', thumbChoice: 'down'}));
    });
    it('should increment the specific thumbChoice included in the action - side', function() {
      resultState = {topicId: 1234, displayed: false, up: 0, down: 0, side: 1};
      assert.deepEqual(resultState,
        thumbsReducer(testState,
        {type: 'THUMB_CLICKED', thumbChoice: 'side'}));
    });
  });

  describe('CLEAR_TOPIC', function () {
    it('should reset the count of all thumbChoice(s) in the store', function() {
      resultState = {topicId: 0, displayed: false, up: 0, down: 0, side: 0};
      assert.deepEqual(resultState,
        thumbsReducer(testState,
        {type: 'CLEAR_TOPIC'}));
    });
  });

});
