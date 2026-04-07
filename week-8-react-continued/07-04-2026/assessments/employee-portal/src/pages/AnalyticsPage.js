import React from 'react';
import { useEmployees } from '../context/EmployeeContext';

function Bar({ label, value, max, color }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 12 }}>
        <span style={{ color: 'var(--text)' }}>{label}</span>
        <span style={{ color: 'var(--text2)', fontFamily: 'var(--mono)' }}>{value}</span>
      </div>
      <div style={{ background: 'var(--surface2)', borderRadius: 99, height: 8, overflow: 'hidden' }}>
        <div style={{ width: `${(value / max) * 100}%`, background: color, height: '100%', borderRadius: 99, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const { employees } = useEmployees();

  const byDept = employees.reduce((acc, e) => { acc[e.department] = (acc[e.department] || 0) + 1; return acc; }, {});
  const byRole = employees.reduce((acc, e) => { acc[e.role] = (acc[e.role] || 0) + 1; return acc; }, {});
  const maxDept = Math.max(...Object.values(byDept));
  const maxRole = Math.max(...Object.values(byRole));
  const active = employees.filter(e => e.status === 'Active').length;
  const pct = Math.round((active / employees.length) * 100);

  const colors = ['var(--accent)', 'var(--success)', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6'];

  return (
    <div className="page fade-in">
      <div className="page-header"><h1>Analytics</h1><p>Organization insights and workforce breakdown.</p></div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>By Department</div>
          {Object.entries(byDept).map(([dept, count], i) => (
            <Bar key={dept} label={dept} value={count} max={maxDept} color={colors[i % colors.length]} />
          ))}
        </div>

        <div className="card" style={{ padding: 22 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>By Role</div>
          {Object.entries(byRole).map(([role, count], i) => (
            <Bar key={role} label={role} value={count} max={maxRole} color={colors[(i + 2) % colors.length]} />
          ))}
        </div>

        <div className="card" style={{ padding: 22 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Workforce Health</div>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 52, fontWeight: 700, fontFamily: 'var(--mono)', color: pct > 70 ? 'var(--success)' : 'var(--danger)' }}>{pct}%</div>
            <div style={{ color: 'var(--text2)', fontSize: 12, marginTop: 4 }}>Active employees</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, background: 'var(--success-light)', borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--mono)', color: 'var(--success)' }}>{active}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)' }}>Active</div>
            </div>
            <div style={{ flex: 1, background: 'var(--danger-light)', borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--mono)', color: 'var(--danger)' }}>{employees.length - active}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)' }}>Inactive</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}