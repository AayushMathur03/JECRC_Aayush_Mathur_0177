import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import BillingPage from './pages/BillingPage';
import HistoryPage from './pages/HistoryPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">🧾 Bill Generator System</div>
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              💳 Billing
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              📊 History
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              📈 Dashboard
            </NavLink>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<BillingPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
