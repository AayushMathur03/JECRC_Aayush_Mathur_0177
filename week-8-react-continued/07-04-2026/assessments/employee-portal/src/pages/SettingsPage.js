import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="page fade-in">
      <div className="page-header"><h1>Settings</h1><p>Manage your preferences and account details.</p></div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
        {/* Account */}
        <div className="card" style={{ padding: 22 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Account</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><label>Full Name</label><input defaultValue={user?.name} /></div>
            <div><label>Role</label><input defaultValue={user?.role} disabled style={{ opacity: 0.6 }} /></div>
            <div style={{ gridColumn: '1/-1' }}><label>Email</label><input type="email" defaultValue={user?.email} /></div>
          </div>
        </div>

        {/* Appearance */}
        <div className="card" style={{ padding: 22 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Appearance</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Dark Mode</div>
              <div style={{ fontSize: 12, color: 'var(--text2)' }}>Switch between light and dark interface</div>
            </div>
            <button onClick={toggleTheme} style={{
              width: 44, height: 24, borderRadius: 99, border: 'none', cursor: 'pointer',
              background: theme === 'dark' ? 'var(--accent)' : 'var(--border)',
              position: 'relative', transition: 'background 0.2s',
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%', background: '#fff',
                position: 'absolute', top: 3, left: theme === 'dark' ? 23 : 3,
                transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }} />
            </button>
          </div>
        </div>

        {/* Save */}
        <div>
          <button className="btn btn-primary" onClick={handleSave}>
            {saved ? '✓ Saved' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}