import { createStore, combineReducers } from 'redux';

// import reducers here
import user from './reducers/userReducer';
import usersClicks from './reducers/usersClicks';
import pulseData from './reducers/pulseData';
import userLectures from './reducers/userLectures';
import activeLecture from './reducers/activeLecture';
import searchValue from './reducers/searchValue';
import summary from './reducers/summary';
import questions from './reducers/questionReducer.jsx';
import thumbs from './reducers/thumbsReducer.jsx';
import feedbackButton from './reducers/feedbackButton.jsx';
// store all reducers in one variable
const combinedReducers = combineReducers({
  pulseData,
  user,
  usersClicks,
  userLectures,
  activeLecture,
  searchValue,
  summary,
  questions,
  thumbs,
  feedbackButton
});

const store = createStore(combinedReducers);

export default store;

// This code populates the store with test clicks on App load.
// It can be used to test usersClicks
// store.dispatch({ type: 'ADDCLICKTOUSER', user: 'duck', time: 1 });
// store.dispatch({ type: 'ADDCLICKTOUSER', user: 'duck', time: 3 });
// store.dispatch({ type: 'ADDCLICKTOUSER', user: 'rubber', time: 1 });
