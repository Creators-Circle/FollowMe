import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

// Redux store name:  store
import store from './store.jsx';
import routes from './routes.jsx';

const render = () => {
  ReactDOM.render(
    // pass redux store as a prop inside Provider to make it available to all components
    <Provider store = {store}>
      <Router history = {browserHistory}>
        {routes}
      </Router>
    </Provider>
  , document.getElementById('app'));
};

render();
