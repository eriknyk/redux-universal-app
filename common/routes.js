import React from 'react';

import App from './containers/App';
import Home from './containers/Home';
import About from './containers/About';
import Counters from './containers/Counters';
import NotFound from './containers/NotFound';

var routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'about', component: About },
    { path: 'home', component: Home },
    { path: 'Counter', component: Counters },
    { path: '*', component: NotFound }
  ]
};

module.exports = routes;
