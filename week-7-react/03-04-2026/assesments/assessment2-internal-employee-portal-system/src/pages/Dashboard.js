import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';
import './Dashboard.css';

/**
 * StatCard generates a summary widget specifically used in the Admin Dashboard.
 * Displays an icon, label, total value, and a decorative background based on color.
 */
function StatCard({ icon, label, value, color, sub }) {
  return (
    <div className="stat-card" style={{ '--accent-color': color }}>
      <div className="stat-icon" style={{ background: `${color}18`, color }}>
        {icon}
      </div>
      <div className="stat-info">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {sub && <div className="stat-sub">{sub}</div>}
      </div>
    </div>
  );
}

/**
 * Dashboard Component serves as the landing interface post-login.
 * Dynamically switches views between "Admin Dashboard" and "Employee Profile/Welcome"
 * corresponding to the current user's role capabilities.
 */
export default function Dashboard() {
  const { currentUser, isAdmin } = useAuth();
  const { employees } = useEmployees();

  const total = employees.length;
  const active = employees.filter((e) => e.status === 'active').length;
  const inactive = total - active;
  const departments = [...new Set(employees.map((e) => e.department))].length;

  const deptCounts = employees.reduce((acc, e) => {
    acc[e.department] = (acc[e.department] || 0) + 1;
    return acc;
  }, {});

  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))
    .slice(0, 4);

  const getAvatarColor = (name) => {
    const colors = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    return colors[name.charCodeAt(0) % colors.length];
  };

  const initials = (name) =>
    name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="dashboard page-enter">
      {/* Hero greeting */}
      <div className="dash-hero">
        <div>
          <p className="dash-greeting">{greeting} 👋</p>
          <h2 className="dash-name">{currentUser?.name}</h2>
          <p className="dash-role-line">
            <span className={`badge ${isAdmin ? 'badge-admin' : 'badge-employee'}`}>
              {isAdmin ? '🛡 HR Admin' : '👤 Employee'}
            </span>
            &nbsp; &nbsp;{currentUser?.position} · {currentUser?.department}
          </p>
        </div>
        <div className="dash-employee-id">
          <span className="dash-id-label">Employee ID</span>
          <span className="dash-id-value">{currentUser?.employeeId}</span>
        </div>
      </div>

      {/* Stats (Admin only) */}
      {isAdmin && (
        <>
          <div className="stats-grid">
            <StatCard icon="👥" label="Total Employees" value={total} color="#6366f1" />
            <StatCard icon="✅" label="Active" value={active} color="#10b981" sub={`${Math.round((active / total) * 100)}% of workforce`} />
            <StatCard icon="⏸" label="Inactive" value={inactive} color="#94a3b8" />
            <StatCard icon="🏢" label="Departments" value={departments} color="#f59e0b" />
          </div>

          {/* Dept breakdown */}
          <div className="dash-section-grid">
            <div className="card card-elevated">
              <h3 className="section-title">Department Overview</h3>
              <div className="dept-list">
                {Object.entries(deptCounts).map(([dept, count]) => (
                  <div key={dept} className="dept-row">
                    <span className="dept-name">{dept}</span>
                    <div className="dept-bar-wrap">
                      <div
                        className="dept-bar"
                        style={{ width: `${(count / total) * 100}%` }}
                      />
                    </div>
                    <span className="dept-count">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-elevated">
              <h3 className="section-title">Recently Joined</h3>
              <div className="recent-list">
                {recentEmployees.map((emp) => (
                  <div key={emp.id} className="recent-row">
                    <div
                      className="avatar"
                      style={{ background: getAvatarColor(emp.name) }}
                    >
                      {initials(emp.name)}
                    </div>
                    <div className="recent-info">
                      <div className="recent-name">{emp.name}</div>
                      <div className="recent-pos">{emp.position}</div>
                    </div>
                    <div className="recent-date">
                      {new Date(emp.joinDate).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Employee view */}
      {!isAdmin && (
        <div className="emp-dash-grid">
          <div className="card card-elevated emp-info-card">
            <h3 className="section-title">Your Information</h3>
            <div className="emp-info-list">
              <div className="emp-info-row">
                <span className="info-key">📧 Email</span>
                <span className="info-val">{currentUser?.email}</span>
              </div>
              <div className="emp-info-row">
                <span className="info-key">📞 Phone</span>
                <span className="info-val">{currentUser?.phone}</span>
              </div>
              <div className="emp-info-row">
                <span className="info-key">🏢 Department</span>
                <span className="info-val">{currentUser?.department}</span>
              </div>
              <div className="emp-info-row">
                <span className="info-key">💼 Position</span>
                <span className="info-val">{currentUser?.position}</span>
              </div>
              <div className="emp-info-row">
                <span className="info-key">📅 Join Date</span>
                <span className="info-val">
                  {new Date(currentUser?.joinDate).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </span>
              </div>
              <div className="emp-info-row">
                <span className="info-key">⚡ Status</span>
                <span className="info-val">
                  <span className={`badge badge-${currentUser?.status}`}>
                    {currentUser?.status}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="card card-elevated emp-welcome-card">
            <div className="emp-welcome-content">
              <div className="emp-big-avatar"
                style={{ background: getAvatarColor(currentUser?.name || 'A') }}>
                {initials(currentUser?.name || 'A')}
              </div>
              <h3>{currentUser?.name}</h3>
              <p>{currentUser?.position}</p>
              <div style={{ marginTop: '12px' }}>
                <span className="badge badge-employee">Employee Portal</span>
              </div>
              <p className="emp-note">
                You can view your profile details and account information here.
                Contact HR for any changes to your records.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
