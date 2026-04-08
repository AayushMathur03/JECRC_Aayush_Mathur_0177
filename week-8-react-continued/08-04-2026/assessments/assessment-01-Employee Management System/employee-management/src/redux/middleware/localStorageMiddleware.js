/**
 * localStorage Middleware
 * 
 * This middleware automatically persists specified parts of the Redux state
 * to localStorage whenever they change.
 * 
 * This is a custom middleware that demonstrates how Redux middleware works:
 * - Middleware sits between dispatching an action and the reducer
 * - It can intercept, modify, delay, or replace actions
 * - It can perform side effects (like saving to localStorage)
 */

const localStorageMiddleware = (store) => (next) => (action) => {
  // First, let the action pass through to the reducer
  const result = next(action);

  // Get the updated state after the action has been processed
  const state = store.getState();

  // Persist employees to localStorage
  if (action.type.startsWith('employees/')) {
    try {
      const serializedEmployees = JSON.stringify(state.employees.employees);
      localStorage.setItem('employees', serializedEmployees);
    } catch (err) {
      console.error('Error saving employees to localStorage:', err);
    }
  }

  // Persist auth state to localStorage
  if (action.type.startsWith('auth/')) {
    try {
      const authData = {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
      };
      localStorage.setItem('auth', JSON.stringify(authData));
    } catch (err) {
      console.error('Error saving auth to localStorage:', err);
    }
  }

  // Persist theme preference to localStorage
  if (action.type.startsWith('ui/') && action.type.includes('Theme')) {
    try {
      localStorage.setItem('theme', state.ui.theme);
    } catch (err) {
      console.error('Error saving theme to localStorage:', err);
    }
  }

  return result;
};

export default localStorageMiddleware;
