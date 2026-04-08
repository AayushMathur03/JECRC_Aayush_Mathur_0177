/**
 * App Component
 * 
 * Main application component that:
 * - Handles authentication routing
 * - Applies theme from Redux state
 * - Renders the main dashboard
 */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './redux/slices/authSlice';
import { selectTheme } from './redux/slices/uiSlice';

// Components
import { LoginForm } from './components/Auth';
import { Header, LoadingSpinner, Notification } from './components/UI';
import { EmployeeForm, EmployeeList } from './components/Employee';
import { selectAllEmployees } from './redux/slices/employeeSlice';

// Styles
import './styles/global.css';

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const theme = useSelector(selectTheme);
  const employees = useSelector(selectAllEmployees);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Calculate stats
  const totalEmployees = employees.length;
  const departments = [...new Set(employees.map(e => e.department))].length;
  const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
  const avgSalary = totalEmployees > 0 ? Math.round(totalSalary / totalEmployees) : 0;

  // If not authenticated, show login
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Authenticated view
  return (
    <div className="app">
      <Header />
      <LoadingSpinner />
      <Notification />

      <main className="app-content">
        <div className="dashboard">
          {/* Stats Section */}
          <section className="stats-section">
            <div className="stat-card">
              <h3>Total Employees</h3>
              <div className="stat-value">{totalEmployees}</div>
            </div>
            <div className="stat-card">
              <h3>Departments</h3>
              <div className="stat-value">{departments}</div>
            </div>
            <div className="stat-card">
              <h3>Total Payroll</h3>
              <div className="stat-value">${totalSalary.toLocaleString()}</div>
            </div>
            <div className="stat-card">
              <h3>Avg. Salary</h3>
              <div className="stat-value">${avgSalary.toLocaleString()}</div>
            </div>
          </section>

          {/* Employee Form */}
          <EmployeeForm />

          {/* Employee List */}
          <EmployeeList />
        </div>
      </main>
    </div>
  );
}

export default App;
