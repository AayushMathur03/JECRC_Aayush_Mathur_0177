/**
 * Entry Point - index.js
 * 
 * This is where we:
 * 1. Import the Redux store
 * 2. Wrap the App with the Redux Provider
 * 3. Render the application
 * 
 * The Provider component makes the Redux store available
 * to all nested components via React Context.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Provider makes Redux store available to all components */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
