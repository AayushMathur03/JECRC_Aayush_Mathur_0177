import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute component wraps any route that requires a logged-in user.
 * If the user is unauthenticated, they're automatically redirected to /login.
 */
export function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

/**
 * AdminRoute component wraps routes strictly meant for Administrators.
 * If not logged in, redirect to login. If logged in but not an Admin, redirect to Dashboard.
 */
export function AdminRoute({ children }) {
  const { currentUser, isAdmin } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
}
