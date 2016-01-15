import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, match } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';
import debug from 'debug';
import createHistory from 'history/lib/createBrowserHistory';
import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';

const clientDebug = debug('app:client');
const rootElement = document.getElementById('app');
const routes = require('../common/routes');

window.React = React; // For chrome dev tool support
window.reduxDebug = debug;
window.reduxDebug.enable('*'); // this should be activated only on development env

const store = configureStore(window.__INITIAL_STATE__);
const history = createHistory();

syncReduxAndRouter(history, store);

clientDebug('rehydrating app');

// calling `match` is simply for side effects of
// loading route/component code for the initial location
match({ routes, location }, () => {
  render(
    <Provider store={ store }>
      <Router routes={ routes } history={ history }/>
    </Provider>,
    rootElement
  );
});
