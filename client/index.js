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

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

const history = createHistory();

console.log('history::', history);
console.log('routes::', routes);

syncReduxAndRouter(history, store);

function createElement (Component, props) {
  return React.createElement(Component, props);
}

const rootRoute = {
  component: 'div',
  childRoutes: [routes]
}

render(
  <Provider store={store} key="provider">
    <Router router={rootRoute} history={history}/>
  </Provider>,
  rootElement
);
