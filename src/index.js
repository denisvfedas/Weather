import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>

    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
