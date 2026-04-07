import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';

function StatCard({ label, value, color = 'var(--accent)' }) {
  return (
    <div className="card" style={{ padding: '20px 22px' }}>
      <div style={{ fontSize: 11, color: 'var(--text2)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 600, color, fontFamily: 'var(--mono)' }}>{value}</div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { employees } = useEmployees();

  const active     = employees.filter(e => e.status === 'Active').length;
  const inactive   = employees.filter(e => e.status === 'Inactive').length;
  const depts      = [...new Set(employees.map(e => e.department))].length;
  const recent     = [...employees].sort((a, b) => new Date(b.joined) - new Date(a.joined)).slice(0, 4);

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>Good day, {user?.name?.split(' ')[0]} 👋</h1>
        <p>Here's what's happening in your organization.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 28 }}>
        <StatCard label="Total Employees"  value={employees.length} />
        <StatCard label="Active"           value={active}    color="var(--success)" />
        <StatCard label="Inactive"         value={inactive}  color="var(--danger)"  />
        <StatCard label="Departments"      value={depts}     color="var(--text)"    />
      </div>

      <div className="card" style={{ padding: '20px 22px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>Recently Joined</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Name', 'Department', 'Role', 'Joined'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: 11, color: 'var(--text2)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.4 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.map(emp => (
              <tr key={emp.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '10px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>
                      {emp.name.charAt(0)}
                    </div>
                    <span style={{ fontWeight: 500, fontSize: 13 }}>{emp.name}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 10px', fontSize: 13, color: 'var(--text2)' }}>{emp.department}</td>
                <td style={{ padding: '10px 10px' }}><span className={`tag ${emp.role === 'Admin' ? 'tag-blue' : 'tag-gray'}`}>{emp.role}</span></td>
                <td style={{ padding: '10px 10px', fontSize: 12, color: 'var(--text2)', fontFamily: 'var(--mono)' }}>{emp.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}