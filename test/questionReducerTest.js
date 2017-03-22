const assert = require('assert');
const deepFreeze = require('deep-freeze');
import  questionReducer  from '../client/src/reducers/questionReducer.jsx';

describe('questionReducer', function() {
  var resultState,
  testState = {
    enabled: false,
    324234:{votes: 3, questionText: 'sample question', upvoted: false}
  };
  deepFreeze(testState);
  
  describe('UNDEFINED ACTION', function(){
    it('should return default state if action is undefined', function () {
      assert.deepEqual(testState, questionReducer(testState, {type: 'TEST'}));
    });
  });

  describe('CREATE_QUESTION', function () {
    it('should add a new question to the store', function () {
      resultState = {
        enabled: false,
        324234:{votes: 3, questionText: 'sample question', upvoted: false},
        435353:{votes: 0, questionText: 'Who am I?', upvoted: false}
      };
      assert.deepEqual(resultState,
        questionReducer(testState, {type: 'CREATE_QUESTION', questionId: 435353, questionText: 'Who am I?'})
      );
    });
  });

  describe('UPVOTE', function () {
    it('should increment the question matching the questionId', function() {
      testState = {324234:{votes: 2, questionText: 'sample question'}, enabled: false}
      resultState = {324234:{votes: 3, questionText: 'sample question'}, enabled: false}
      assert.deepEqual(resultState, 
        questionReducer(testState,{type: 'UPVOTE', questionId: 324234})
      );
    });
  });

  describe('DOWNVOTE', function () {
    it('should decrement the question matching the questionId', function() {
      testState = {324234:{votes: 3, questionText: 'sample question'}, enabled: false}
      resultState = {324234:{votes: 2, questionText: 'sample question'}, enabled: false}
      assert.deepEqual(resultState,
        questionReducer(testState, {type: 'DOWNVOTE', questionId: 324234})
      );
    });
  });

  describe('CLEAR_QUESTIONS', function () {
    it('should clear the store of all questions', function() {
      resultState = {enabled: false};
      assert.deepEqual(resultState,
        questionReducer(testState, {type: 'CLEAR_QUESTIONS'})
      );
    });
  });

  describe('TOGGLE_UPVOTED', function () {
    it('should toggle the upvoted value for a given question', function() {
      testState = {324234:{votes: 3, questionText: 'sample question', upvoted: false}, enabled: false}
      resultState = {324234:{votes: 3, questionText: 'sample question', upvoted: true}, enabled: false}
      assert.deepEqual(resultState,
        questionReducer(testState, {type: 'TOGGLE_UPVOTED', questionId: 324234})
      );
    });
  });
});
