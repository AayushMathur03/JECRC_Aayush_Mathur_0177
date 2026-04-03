import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function validate(username, password) {
  const errors = {};
  if (!username.trim()) errors.username = 'Username is required';
  if (!password) errors.password = 'Password is required';
  else if (password.length < 4) errors.password = 'Password must be at least 4 characters';
  return errors;
}

/**
 * Login Component handles user authentication.
 * Includes local state management for input fields, client-side validation logic,
 * and visual mechanisms (loaders, error messages, demo pill actions).
 */
export default function Login() {
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form.username, form.password);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      await login(form.username.trim(), form.password);
      navigate('/dashboard');
    } catch {
      // error is shown from context
    }
  };

  const fillDemo = (username, password) => {
    setForm({ username, password });
    setErrors({});
    clearError();
  };

  return (
    <div className="login-page">
      {/* Background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo">
            <span>C</span>
          </div>
          <h1 className="login-title">CorpX Portal</h1>
          <p className="login-subtitle">Sign in to your employee account</p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="alert alert-error" style={{ marginBottom: '20px' }}>
            <span>⚠</span> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className={`form-control ${errors.username ? 'error' : ''}`}
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              autoFocus
            />
            {errors.username && (
              <div className="form-error">⚠ {errors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                id="password"
                name="password"
                type={showPass ? 'text' : 'password'}
                className={`form-control ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="pass-toggle"
                onClick={() => setShowPass((s) => !s)}
                tabIndex={-1}
              >
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
            {errors.password && (
              <div className="form-error">⚠ {errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
            style={{ padding: '14px', fontSize: '0.95rem', marginTop: '8px' }}
          >
            {loading ? (
              <>
                <span className="spinner" /> Authenticating...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="demo-section">
          <p className="demo-label">Demo Accounts</p>
          <div className="demo-pills">
            <button
              className="demo-pill admin"
              onClick={() => fillDemo('admin', 'admin123')}
              type="button"
            >
              🛡 Admin
            </button>
            <button
              className="demo-pill employee"
              onClick={() => fillDemo('emily', 'emily123')}
              type="button"
            >
              👤 Emily (Employee)
            </button>
            <button
              className="demo-pill employee"
              onClick={() => fillDemo('michael', 'michael123')}
              type="button"
            >
              👤 Michael (Employee)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
