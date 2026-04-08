/**
 * UI Slice - Redux Toolkit
 * 
 * This slice manages global UI state:
 * - Theme (light/dark)
 * - Loading indicators
 * - Notifications
 * - Modal states
 */

import { createSlice } from '@reduxjs/toolkit';

// Load persisted theme from localStorage
const loadThemeFromLocalStorage = () => {
  try {
    const theme = localStorage.getItem('theme');
    return theme || 'light';
  } catch (err) {
    return 'light';
  }
};

const initialState = {
  theme: loadThemeFromLocalStorage(),
  globalLoading: false,
  notification: null,
  sidebarOpen: true
};

/**
 * UI Slice
 * 
 * Manages application-wide UI state that needs to be shared
 * across multiple components.
 */
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Toggle between light and dark theme
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },

    // Set specific theme
    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    // Show global loading spinner
    showLoading: (state) => {
      state.globalLoading = true;
    },

    // Hide global loading spinner
    hideLoading: (state) => {
      state.globalLoading = false;
    },

    // Show notification
    showNotification: (state, action) => {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type || 'info', // 'success', 'error', 'warning', 'info'
        id: Date.now()
      };
    },

    // Hide notification
    hideNotification: (state) => {
      state.notification = null;
    },

    // Toggle sidebar
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    }
  }
});

// Export actions
export const {
  toggleTheme,
  setTheme,
  showLoading,
  hideLoading,
  showNotification,
  hideNotification,
  toggleSidebar
} = uiSlice.actions;

// Export selectors
export const selectTheme = (state) => state.ui.theme;
export const selectGlobalLoading = (state) => state.ui.globalLoading;
export const selectNotification = (state) => state.ui.notification;
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;

// Export reducer
export default uiSlice.reducer;
