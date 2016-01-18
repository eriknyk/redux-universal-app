import React from 'react';
import { renderToString } from 'react-dom/server';
import { Router, RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createMemoryHistory';
import qs from 'qs';
import { syncHistory, routeReducer } from 'redux-simple-router';

import routes from '../common/routes';
import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';
import { fetchCounter } from '../common/api/counter';

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

export default function handleRender(req, res) {
  // Query our mock API asynchronously
  fetchCounter(apiResult => {
    // Read the counter from the request, if provided
    const params = qs.parse(req.query);
    const counter = parseInt(params.counter, 10) || apiResult || 0;

    // Compile an initial state
    const initialState = { counter };
    const history = createHistory();
    const reduxRouterMiddleware = syncHistory(history);

    // Create a new Redux store instance
    const store = configureStore(initialState, reduxRouterMiddleware);

    match(
      {routes: routes, location: req.originalUrl},
      (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
          res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
          console.error('ROUTER ERROR:', error);
          res.status(500);
        } else if (!renderProps) {
          res.status(500);
        } else {
          const component = (
            <Provider store={store}>
                <RouterContext {...renderProps}/>
            </Provider>
          );
          const html = renderToString(component);

          res.send(renderFullPage(html, store.getState()));
        }
      }
    )
  })
}
