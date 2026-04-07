import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@corp.com', password: 'password', role: 'Admin' },
  { id: 2, name: 'Bob Smith',     email: 'bob@corp.com',   password: 'password', role: 'Employee' },
];

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 600)); // simulate API
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      setLoading(false);
      return true;
    }
    setError('Invalid email or password.');
    setLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);