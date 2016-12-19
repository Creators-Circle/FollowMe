import { createStore, combineReducers } from 'redux';

//reducer for incrememnt/decrement
const pulseData = (state, action) => {
  let last = state[state.length-1]
  switch (action.type) {
    case 'increment':
      return state.concat([last++])
    case 'decrement':
      return state.concat([last--])
    default:
      return state;
  }
}

//store all reducers in one variable
const combinedReducers = combineReducers({
  pulseData
});

const store = createStore(combinedReducers);

export default store;
