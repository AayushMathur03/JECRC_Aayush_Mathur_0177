import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const SunIcon  = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>;
const MoonIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const LogoutIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>;

export default function Navbar({ activePage, setPage }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'dashboard',  label: 'Dashboard'  },
    { id: 'employees',  label: 'Employees'  },
    { id: 'analytics',  label: 'Analytics'  },
    { id: 'settings',   label: 'Settings'   },
  ];

  return (
    <nav style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 56,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <span style={{ fontFamily: 'var(--mono)', fontWeight: 500, fontSize: 14, color: 'var(--accent)', letterSpacing: '-0.5px' }}>
          ◆ portal
        </span>
        {/* Nav links */}
        <div style={{ display: 'flex', gap: 2 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              background: activePage === item.id ? 'var(--accent-light)' : 'transparent',
              color: activePage === item.id ? 'var(--accent)' : 'var(--text2)',
              border: 'none', borderRadius: 6, padding: '6px 12px',
              fontSize: 13, fontWeight: activePage === item.id ? 600 : 400,
              cursor: 'pointer', fontFamily: 'var(--font)',
              transition: 'all var(--transition)',
            }}>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={toggleTheme} className="btn btn-ghost" style={{ padding: '6px 10px' }}>
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px', background: 'var(--surface2)', borderRadius: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 600 }}>
            {user?.name?.charAt(0)}
          </div>
          <div style={{ lineHeight: 1.3 }}>
            <div style={{ fontSize: 12, fontWeight: 500 }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text2)' }}>{user?.role}</div>
          </div>
        </div>
        <button onClick={logout} className="btn btn-ghost" style={{ padding: '6px 10px', color: 'var(--danger)' }}>
          <LogoutIcon /> Logout
        </button>
      </div>
    </nav>
  );
}