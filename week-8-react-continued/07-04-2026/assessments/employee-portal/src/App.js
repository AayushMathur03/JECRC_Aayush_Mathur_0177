import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { EmployeeProvider } from './context/EmployeeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

function AppContent() {
  const [page, setPage] = useState('dashboard');
  const pages = { dashboard: DashboardPage, employees: EmployeesPage, analytics: AnalyticsPage, settings: SettingsPage };
  const Page = pages[page] || DashboardPage;

  return (
    <ProtectedRoute>
      <Navbar activePage={page} setPage={setPage} />
      <Page />
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EmployeeProvider>
          <AppContent />
        </EmployeeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}