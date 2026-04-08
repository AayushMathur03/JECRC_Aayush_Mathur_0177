/**
 * Header Component
 * 
 * Application header with:
 * - Logo/Title
 * - Theme toggle
 * - User info and logout
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../redux/slices/authSlice';
import { toggleTheme, selectTheme, showNotification } from '../../redux/slices/uiSlice';
import './UI.css';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showNotification({
      message: 'You have been logged out successfully',
      type: 'info'
    }));
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="logo">
          <span className="logo-icon">👥</span>
          Employee Management
        </h1>
      </div>

      <div className="header-right">
        <button
          className="theme-toggle"
          onClick={handleThemeToggle}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <div className="user-info">
          <span className="user-name">{user?.name}</span>
          <span className="user-role">{user?.role}</span>
        </div>

        <button className="btn btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
