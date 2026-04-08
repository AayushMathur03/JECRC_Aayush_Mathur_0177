/**
 * Auth Slice - Redux Toolkit
 * 
 * This slice manages authentication state:
 * - User login/logout
 * - Authentication status
 * - User information
 */

import { createSlice } from '@reduxjs/toolkit';

// Load persisted auth state from localStorage
const loadAuthFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('auth');
    if (serializedState === null) {
      return {
        isAuthenticated: false,
        user: null
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading auth from localStorage:', err);
    return {
      isAuthenticated: false,
      user: null
    };
  }
};

const persistedAuth = loadAuthFromLocalStorage();

const initialState = {
  isAuthenticated: persistedAuth.isAuthenticated,
  user: persistedAuth.user,
  isLoading: false,
  error: null
};

/**
 * Auth Slice
 * 
 * Demonstrates Redux state management for authentication.
 * In a real application, you would integrate this with a backend API.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Start login process
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    // Successful login
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    // Failed login
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.error = action.payload;
    },

    // Logout user
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },

    // Clear auth error
    clearAuthError: (state) => {
      state.error = null;
    }
  }
});

// Export actions
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearAuthError
} = authSlice.actions;

// Export selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

// Thunk action for simulated login (without axios)
export const performLogin = (credentials) => (dispatch) => {
  dispatch(loginStart());

  // Simulate API call with setTimeout
  setTimeout(() => {
    // Mock authentication - in real app, this would be an API call
    if (credentials.email === 'admin@company.com' && credentials.password === 'admin123') {
      const user = {
        id: 1,
        name: 'Admin User',
        email: credentials.email,
        role: 'Administrator'
      };
      dispatch(loginSuccess(user));
    } else if (credentials.email && credentials.password) {
      // Accept any credentials for demo purposes
      const user = {
        id: Date.now(),
        name: credentials.email.split('@')[0],
        email: credentials.email,
        role: 'User'
      };
      dispatch(loginSuccess(user));
    } else {
      dispatch(loginFailure('Invalid email or password'));
    }
  }, 1000); // Simulate network delay
};

// Export reducer
export default authSlice.reducer;
