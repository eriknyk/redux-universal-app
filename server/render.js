import React from 'react'
import { renderToString } from 'react-dom/server'
import { Router, RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createMemoryHistory';
import qs from 'qs';

import routes from '../common/routes';
import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'
import { fetchCounter } from '../common/api/counter'

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
    const params = qs.parse(req.query)
    const counter = parseInt(params.counter, 10) || apiResult || 0

    // Compile an initial state
    const initialState = { counter }

    // Create a new Redux store instance
    const store = configureStore(initialState)

    // Render the component to a string
    // const html = renderToString(
    //   <Provider store={store}>
    //     <App />
    //   </Provider>
    // )

    match(
      {routes: routes, location: req.originalUrl},
      (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
          res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
          console.error('ROUTER ERROR:', pretty.render(error));
          res.status(500);
        } else if (!renderProps) {
          res.status(500);
        } else {
          try {
              const component = (
                <Provider store={store} key="provider">
                  <RoutingContext {...renderProps}/>
                </Provider>
              );
              const html = renderToString(component);

              res.send(renderFullPage(html, initialState));

          } catch(err) {
            console.error('DATA FETCHING ERROR:', err);
            res.status(500);
          }
        }
      }
    )

    // Grab the initial state from our Redux store
    //const finalState = store.getState()

    // Send the rendered page back to the client
    //res.send(renderFullPage(html, finalState))
  })
}
