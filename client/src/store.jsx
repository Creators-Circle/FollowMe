import { createStore, combineReducers } from 'redux';

// import reducers here
import user from './reducers/userReducer';
import usersClicks from './reducers/usersClicks';
import pulseData from './reducers/pulseData';
import userLectures from './reducers/userLectures';
import searchValue from './reducers/searchValue';

// store all reducers in one variable
const combinedReducers = combineReducers({
  pulseData,
  user,
  usersClicks,
  userLectures,
  searchValue
});

const store = createStore(combinedReducers);

export default store;

// This code populates the store with test clicks on App load.
// It can be used to test usersClicks
// store.dispatch({ type: 'ADDCLICKTOUSER', user: 'duck', time: 1 });
// store.dispatch({ type: 'ADDCLICKTOUSER', user: 'duck', time: 3 });
// store.dispatch({ type: 'ADDCLICKTOUSER', user: 'rubber', time: 1 });
