import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
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
import picker from './reducers/googlePickerReducer.jsx';
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
  feedbackButton,
  picker
});

const store = applyMiddleware(ReduxPromise)(createStore)(combinedReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
