import React from 'react';
import ReactDOM from 'react-dom/client';
import WrapComponent from './component/WrapComponent';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import modalState from './store/modalState';
import login from './store/login';
import viewProduct from './store/viewProduct';
import cart from './store/cart';
import modal from './store/modal';

const store = configureStore({
  reducer: {
      modalState,
      login,
      viewProduct,
      cart,
      modal
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <WrapComponent/>
  </Provider>
);