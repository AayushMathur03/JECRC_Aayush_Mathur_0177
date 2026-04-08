/**
 * LoginForm Component
 * 
 * Handles user authentication with Redux.
 * Demonstrates:
 * - Dispatching async actions (thunks)
 * - Handling loading states
 * - Error display
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  performLogin,
  selectAuthLoading,
  selectAuthError,
  clearAuthError
} from '../../redux/slices/authSlice';
import './Auth.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (error) {
      dispatch(clearAuthError());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(performLogin(credentials));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Employee Management</h1>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-alert">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-login"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo credentials:</p>
          <code>admin@company.com / admin123</code>
          <p className="hint">Or use any email/password to login</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
