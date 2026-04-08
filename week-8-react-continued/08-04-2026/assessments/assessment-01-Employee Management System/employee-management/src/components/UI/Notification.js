/**
 * Notification Component
 * 
 * Displays toast-style notifications managed by Redux.
 * Auto-dismisses after a timeout.
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNotification, hideNotification } from '../../redux/slices/uiSlice';
import './UI.css';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) {
    return null;
  }

  const getTypeClass = () => {
    switch (notification.type) {
      case 'success':
        return 'notification-success';
      case 'error':
        return 'notification-error';
      case 'warning':
        return 'notification-warning';
      default:
        return 'notification-info';
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={`notification ${getTypeClass()}`}>
      <span className="notification-icon">{getIcon()}</span>
      <span className="notification-message">{notification.message}</span>
      <button
        className="notification-close"
        onClick={() => dispatch(hideNotification())}
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
