import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppNav from './navigations/AppNav';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AuthNav from './navigations/AuthNav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = configureStore();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {localStorage.getItem('isLoggedIn') ? <AppNav /> : <AuthNav />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Flip
      />
    </Provider>
  </React.StrictMode>
);
