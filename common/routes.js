import React from 'react';

import App from './containers/App';
import Home from './containers/Home';
import About from './containers/About';
import NotFound from './containers/NotFound';

var routes = {
  path: '/',
  component: App,
  childRoutes: [
    { path: 'about', component: About },
    { path: 'home', component: Home },
    { path: '*', component: NotFound }
  ]
};

module.exports = routes;
