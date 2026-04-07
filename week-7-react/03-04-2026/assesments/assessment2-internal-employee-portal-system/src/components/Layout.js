import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Toast from './Toast';
import './Layout.css';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/employees': 'Employee Management',
  '/add-employee': 'Add Employee',
  '/profile': 'My Profile',
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] || 'CorpX Portal';

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-area">
        <Header
          title={title}
          onMenuToggle={() => setSidebarOpen((o) => !o)}
        />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
      <Toast />
    </div>
  );
}
