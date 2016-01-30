import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import App from './App';
import Results from './Results';
import Voting from './Voting';

export default function () {

  return (
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={Voting}/>
        <Route path="/results" component={Results}/>
      </Route>
    </Router>
  );

};