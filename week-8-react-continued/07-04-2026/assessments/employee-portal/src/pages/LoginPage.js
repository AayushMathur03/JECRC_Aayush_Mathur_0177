import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, error, loading } = useAuth();
  const [email, setEmail]       = useState('alice@corp.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: 24 }}>
      <div className="card fade-in" style={{ width: '100%', maxWidth: 380, padding: '36px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 24, color: 'var(--accent)', fontWeight: 500, marginBottom: 6 }}>◆ portal</div>
          <div style={{ color: 'var(--text2)', fontSize: 13 }}>Sign in to your workspace</div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label>Email address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@corp.com" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>

          {error && (
            <div style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '8px 12px', borderRadius: 6, fontSize: 12 }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4, padding: '10px' }} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div style={{ marginTop: 20, padding: '12px', background: 'var(--surface2)', borderRadius: 8, fontSize: 11, color: 'var(--text2)', lineHeight: 1.8, fontFamily: 'var(--mono)' }}>
          <strong style={{ color: 'var(--text)', fontFamily: 'var(--font)', fontSize: 11 }}>Demo accounts</strong><br/>
          alice@corp.com / password (Admin)<br/>
          bob@corp.com / password (Employee)
        </div>
      </div>
    </div>
  );
}
