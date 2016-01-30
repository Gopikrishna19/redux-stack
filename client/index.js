import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import reducer from './reducer';
import Router from './components/Router';
import remoActionMiddleware from './remote-action-middleware';
import {setState} from './action-creators';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => store.dispatch(setState(state)));

const store = applyMiddleware(remoActionMiddleware(socket))(createStore)(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('app')
);
