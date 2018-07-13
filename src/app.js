/**
 * Created by Veronika on 13.07.18.
 */

/* globals document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './containers/App';

import configureStore from './redux';

const Store = configureStore();

ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <div>
        <Route
          exact
          path="/"
          component={App}
        />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
