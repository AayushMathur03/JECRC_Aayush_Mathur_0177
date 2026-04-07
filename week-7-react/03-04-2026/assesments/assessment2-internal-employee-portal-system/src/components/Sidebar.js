import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const adminNavItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '⊞' },
  { to: '/employees', label: 'Employees', icon: '👥' },
  { to: '/add-employee', label: 'Add Employee', icon: '➕' },
  { to: '/profile', label: 'My Profile', icon: '👤' },
];

const employeeNavItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '⊞' },
  { to: '/profile', label: 'My Profile', icon: '👤' },
];

export default function Sidebar({ open, onClose }) {
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = isAdmin ? adminNavItems : employeeNavItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getAvatarColor = (name) => {
    const colors = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    const idx = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[idx];
  };

  const initials = currentUser?.name
    ? currentUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
    : '?';

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">
            <span>C</span>
          </div>
          <div>
            <div className="logo-name">CorpX</div>
            <div className="logo-sub">Employee Portal</div>
          </div>
        </div>

        {/* Role label */}
        <div className="sidebar-role">
          <span className={`badge ${isAdmin ? 'badge-admin' : 'badge-employee'}`}>
            {isAdmin ? '🛡 Admin' : '👤 Employee'}
          </span>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <p className="nav-section-label">Navigation</p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
              onClick={onClose}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div
              className="avatar"
              style={{ background: getAvatarColor(currentUser?.name) }}
            >
              {initials}
            </div>
            <div className="user-info">
              <div className="user-name">{currentUser?.name}</div>
              <div className="user-email">{currentUser?.email}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <span>⏻</span> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
