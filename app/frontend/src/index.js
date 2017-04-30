import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';
import Home from './Home';
import Movie from './Movie';
import './index.css';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Home}/>
    <Route path="/movie/:id" component={Movie}/>
  </Router>,
  document.getElementById('root')
);
