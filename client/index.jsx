import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

import store from './store.jsx';
import App from './components/App.jsx';

const render = () => {
  ReactDOM.render(
    <Provider store = {store}>
      <Router>
        <Route path="/" component={App} />
        {/* {fill in with other components that needs a specif route} */}
      </Router>
    </Provider>
  ,document.getElementById('app'));
};

store.subscribe(render);
render();
