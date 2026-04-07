import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';

import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import Profile from './pages/Profile';

import './index.css';

/**
 * Main application component. 
 * Sets up the React Router, wraps the app in Context Providers (Auth & Employee),
 * and defines the routing architecture with Role-Based access limits.
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EmployeeProvider>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />
            
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Protected routes wrapped in Layout */}
            <Route 
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Admin only routes */}
              <Route 
                path="/employees" 
                element={
                  <AdminRoute>
                    <EmployeeList />
                  </AdminRoute>
                } 
              />
              <Route 
                path="/add-employee" 
                element={
                  <AdminRoute>
                    <EmployeeForm />
                  </AdminRoute>
                } 
              />
              <Route 
                path="/edit-employee/:id" 
                element={
                  <AdminRoute>
                    <EmployeeForm />
                  </AdminRoute>
                } 
              />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </EmployeeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
