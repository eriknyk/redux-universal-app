import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';
import createHistory from 'history/lib/createBrowserHistory';
import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';

const rootElement = document.getElementById('app');
const routes = require('../common/routes');
const store = configureStore(window.__INITIAL_STATE__);
const history = createHistory();

syncReduxAndRouter(history, store);

render(
  <Provider store={store}>
    <div>
      <Router router={routes} history={history}/>
    </div>
  </Provider>,
  rootElement
);
