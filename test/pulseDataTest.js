const deepFreeze = require('deep-freeze');
const assert = require('assert');
import pulseData from '../client/src/reducers/pulseData';

describe('pulseData', function() {

 var testState, testStateLength, resultState

  beforeEach(function() {
    testState = [{x: 0,y: 1},{x: 0,y: 2},{x: 0,y: 3},{x: 0,y: 4},{x: 0,y: 5}], 
    testStateLength = testState.length,
    resultState;
    deepFreeze(testState);
  });

  describe('UNDEFINED ACTION', function(){
    it('should return state if action is undefined', function(){
      assert.deepEqual(testState, pulseData(testState, {type: 'ARGLEBARGLE'}));
    });
  });

  describe('RETURNS ARRAY', function() {
    it('should return an array', function() {
      assert(Array.isArray(pulseData(testState, {type: 'INCREMENT', time: 0})));
    });
  });

  describe('INCREMENT', function() {
    resultState = [{x: 0,y: 1},{x: 0,y: 2},{x: 0,y: 3},{x: 0,y: 4},{x: 0,y: 5},{x:0, y:6}];
    
    it('should add a data point with a y value greater by 1 than the points to its left', function() {
      assert.deepEqual(resultState, pulseData(testState, {type: 'INCREMENT', time: 0}));
    });

    it('should add a data point with a y value greater by 1 than the point to its left', function() {
      assert.equal(pulseData(testState, {type: 'INCREMENT', time: 0}).length, testStateLength+1);
    });

    it('should allow a time value to be passed in', function() {
      resultState = [{x: 0,y: 1},{x: 0,y: 2},{x: 0,y: 3},{x: 0,y: 4},{x: 0,y: 5},{x:1, y:6}]
      assert.deepEqual(resultState, pulseData(testState, {type: 'INCREMENT',time: 1}));
    });
  });

  describe('DECREMENT', function() {
    it('should add a data point with a y value lesser by 1 than the point to its left', function() {
      resultState = [{x: 0,y: 1},{x: 0,y: 2},{x: 0,y: 3},{x: 0,y: 4},{x: 0,y: 5},{x: 0,y: 4}]
      assert.deepEqual(resultState, pulseData(testState, {type: 'DECREMENT', time: 0}));
    });

    it('should add a data point with a y value lesser by 1 than the point to its left', function() {
      assert.equal(pulseData(testState, {type: 'DECREMENT', time: 0}).length, testStateLength+1);
    });

    it('should allow a time value to be passed in', function() {
      resultState = [{x: 0,y: 1},{x: 0,y: 2},{x: 0,y: 3},{x: 0,y: 4},{x: 0,y: 5},{x:1, y:4}];
      assert.deepEqual(resultState, pulseData(testState, {type: 'DECREMENT',time: 1}));
    });

    it('should record a point of (0,0) when DECREMENTing from 0 clicks', function() {
      var zeroTestState = [{x: 0,y: 0}]; 
      resultState = [{x: 0,y: 0}, {x: 0,y: 0}];
      deepFreeze(zeroTestState);
      assert.deepEqual(resultState, pulseData(zeroTestState, {type: 'DECREMENT', time: 0}));
    });
  });
  
});
