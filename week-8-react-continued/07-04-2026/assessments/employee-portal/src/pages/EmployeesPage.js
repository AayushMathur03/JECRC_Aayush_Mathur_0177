import React, { useState } from 'react';
import { useEmployees } from '../context/EmployeeContext';

const DEPTS = ['Engineering', 'Marketing', 'HR', 'Finance', 'Operations', 'Design'];
const ROLES = ['Admin', 'Manager', 'Employee'];
const EMPTY = { name: '', email: '', department: 'Engineering', role: 'Employee', status: 'Active', joined: new Date().toISOString().split('T')[0] };

export default function EmployeesPage() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [search, setSearch]   = useState('');
  const [modal, setModal]     = useState(null); // null | 'add' | {employee}
  const [form, setForm]       = useState(EMPTY);
  const [confirmId, setConfirmId] = useState(null);

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.department.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd  = () => { setForm(EMPTY); setModal('add'); };
  const openEdit = (emp) => { setForm(emp); setModal(emp); };
  const closeModal = () => setModal(null);

  const handleSave = () => {
    if (!form.name || !form.email) return;
    modal === 'add' ? addEmployee(form) : updateEmployee(form);
    closeModal();
  };

  const handleDelete = (id) => { deleteEmployee(id); setConfirmId(null); };

  return (
    <div className="page fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div><h1>Employees</h1><p>Manage your organization's people.</p></div>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Employee</button>
      </div>

      <div className="card" style={{ padding: '14px 16px', marginBottom: 14 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email or department…" />
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface2)' }}>
              {['Employee', 'Department', 'Role', 'Status', 'Joined', ''].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, color: 'var(--text2)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.4 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ padding: 32, textAlign: 'center', color: 'var(--text2)', fontSize: 13 }}>No employees found.</td></tr>
            )}
            {filtered.map(emp => (
              <tr key={emp.id} style={{ borderTop: '1px solid var(--border)', transition: 'background var(--transition)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 13 }}>{emp.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text2)' }}>{emp.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 14px', fontSize: 13, color: 'var(--text2)' }}>{emp.department}</td>
                <td style={{ padding: '12px 14px' }}><span className={`tag ${emp.role === 'Admin' ? 'tag-blue' : emp.role === 'Manager' ? 'tag-green' : 'tag-gray'}`}>{emp.role}</span></td>
                <td style={{ padding: '12px 14px' }}><span className={`tag ${emp.status === 'Active' ? 'tag-green' : 'tag-red'}`}>{emp.status}</span></td>
                <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--text2)', fontFamily: 'var(--mono)' }}>{emp.joined}</td>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => openEdit(emp)}>Edit</button>
                    <button className="btn btn-danger" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => setConfirmId(emp.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 16 }}>
          <div className="card fade-in" style={{ width: '100%', maxWidth: 440, padding: 28 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 20 }}>{modal === 'add' ? 'Add Employee' : 'Edit Employee'}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ gridColumn: '1/-1' }}><label>Full Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" /></div>
              <div style={{ gridColumn: '1/-1' }}><label>Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@corp.com" /></div>
              <div><label>Department</label>
                <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}>
                  {DEPTS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div><label>Role</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div><label>Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option>Active</option><option>Inactive</option>
                </select>
              </div>
              <div><label>Joined Date</label><input type="date" value={form.joined} onChange={e => setForm({ ...form, joined: e.target.value })} /></div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {confirmId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 16 }}>
          <div className="card fade-in" style={{ maxWidth: 340, padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Delete Employee?</div>
            <div style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 20 }}>This action cannot be undone.</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button className="btn btn-ghost" onClick={() => setConfirmId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(confirmId)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}