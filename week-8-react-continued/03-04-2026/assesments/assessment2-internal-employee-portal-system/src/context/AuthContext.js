import React, { createContext, useContext, useState, useCallback } from 'react';

// Pre-defined user accounts
const USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Alex Johnson',
    email: 'alex.johnson@corpx.com',
    department: 'Management',
    position: 'HR Director',
    employeeId: 'EMP-001',
    joinDate: '2020-01-15',
    salary: 120000,
    phone: '+1 (555) 001-0001',
    status: 'active',
  },
  {
    id: 2,
    username: 'emily',
    password: 'emily123',
    role: 'employee',
    name: 'Emily Carter',
    email: 'emily.carter@corpx.com',
    department: 'Engineering',
    position: 'Senior Developer',
    employeeId: 'EMP-002',
    joinDate: '2021-03-22',
    salary: 95000,
    phone: '+1 (555) 001-0002',
    status: 'active',
  },
  {
    id: 3,
    username: 'michael',
    password: 'michael123',
    role: 'employee',
    name: 'Michael Chen',
    email: 'michael.chen@corpx.com',
    department: 'Sales',
    position: 'Sales Manager',
    employeeId: 'EMP-003',
    joinDate: '2022-07-10',
    salary: 87000,
    phone: '+1 (555) 001-0003',
    status: 'active',
  },
];

const AuthContext = createContext(null);

/**
 * AuthProvider manages the authentication state (login, logout, current user).
 * It provides simulated network requests and mock user validation.
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Authenticate a user by username and password. 
   * Demonstrates simulated async operation with network delay.
   */
  const login = useCallback((username, password) => {
    setLoading(true);
    setError('');

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = USERS.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          const { password: _, ...safeUser } = user;
          setCurrentUser(safeUser);
          setLoading(false);
          resolve(safeUser);
        } else {
          setError('Invalid username or password. Please try again.');
          setLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // Simulated network delay
    });
  }, []);

  /**
   * Clears the current user to log out.
   */
  const logout = useCallback(() => {
    setCurrentUser(null);
    setError('');
  }, []);

  const clearError = useCallback(() => setError(''), []);

  const isAdmin = currentUser?.role === 'admin';
  const isEmployee = currentUser?.role === 'employee';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        login,
        logout,
        clearError,
        isAdmin,
        isEmployee,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to easily consume the AuthContext.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { USERS };
