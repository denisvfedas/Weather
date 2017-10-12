import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './index.css';
import App from './App';
import City from './City';
import Start from './Start';
import Hourly from './Hourly';
import Daily from './Daily';
import registerServiceWorker from './registerServiceWorker';


const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Start} />
      <Route path="/:city" component={City}>
        <IndexRoute component={Hourly}/>
        <Route path="/:city/daily" component={Daily}/>
      </Route>
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
