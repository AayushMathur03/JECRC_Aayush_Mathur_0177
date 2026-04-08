/**
 * Redux Store Configuration
 * 
 * The Store is the single source of truth in Redux.
 * It holds the complete state tree of the application.
 * 
 * Key concepts demonstrated:
 * 1. Store creation with configureStore (Redux Toolkit)
 * 2. Combining multiple reducers
 * 3. Adding middleware (logger, localStorage persistence)
 */

import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

// Import reducers (slices)
import employeeReducer from './slices/employeeSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

// Import custom middleware
import localStorageMiddleware from './middleware/localStorageMiddleware';

/**
 * Configure the Redux store
 * 
 * configureStore automatically:
 * - Combines the reducers
 * - Adds thunk middleware for async actions
 * - Sets up Redux DevTools Extension
 * - Enables hot module replacement for reducers
 */
const store = configureStore({
  // Combine all reducers into a single root reducer
  reducer: {
    employees: employeeReducer,
    auth: authReducer,
    ui: uiReducer
  },
  
  // Add custom middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serializable check for non-serializable values
      serializableCheck: false
    }).concat(localStorageMiddleware, logger)
});

export default store;
