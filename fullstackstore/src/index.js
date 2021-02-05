import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap';
import Header from './components/cabecalho';
import Footer from './components/footer';
import store from './Reducers/index';
import { createStore } from 'redux'
import { Provider } from 'react-redux'


const loja = createStore(
  store
)


ReactDOM.render(
  <Provider store={loja}>

    <Header />

    <Footer />

  </Provider>,
  document.getElementById('root')
);
