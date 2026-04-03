import React from 'react';
import { useEmployees } from '../context/EmployeeContext';
import './Toast.css';

export default function Toast() {
  const { toast } = useEmployees();

  if (!toast) return null;

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`toast-container toast-${toast.type || 'success'}`}>
      <span className="toast-icon">{icons[toast.type] || icons.success}</span>
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}
