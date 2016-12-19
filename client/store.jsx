import { createStore, combineReducers } from 'redux';

//store all reducers in one variable
const combinedReducers = combineReducers({
  //fill in with reducers
});


const store = createStore(combinedReducers);

export default store;
