import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import './EmployeeList.css';

/**
 * EmployeeList Component acts as the main database overview for Admins.
 * Provides a tabular view of all employees with functionality to search (filter),
 * edit, or delete existing employee records.
 */
export default function EmployeeList() {
  const { employees, deleteEmployee } = useEmployees();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const filteredEmployees = employees.filter((emp) => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteId) {
      deleteEmployee(deleteId);
      setDeleteId(null);
    }
  };

  const getAvatarColor = (name) => {
    const colors = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    return colors[name ? name.charCodeAt(0) % colors.length : 0];
  };

  const initials = (name) =>
    name ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : '?';

  return (
    <div className="employee-list-page page-enter">
      <div className="list-header">
        <div>
          <h2 className="list-title">Employee Directory</h2>
          <p className="list-subtitle">Manage and view all employee records</p>
        </div>
        <div className="list-actions">
          <input 
            type="text" 
            className="form-control search-input" 
            placeholder="Search by name, ID, department..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" onClick={() => navigate('/add-employee')}>
            <span>➕</span> Add Employee
          </button>
        </div>
      </div>

      <div className="card table-wrapper">
        {filteredEmployees.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Employee ID</th>
                <th>Contact info</th>
                <th>Department & Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <div className="emp-profile-cell">
                      <div className="avatar" style={{ background: getAvatarColor(emp.name) }}>
                        {initials(emp.name)}
                      </div>
                      <div className="emp-name-cell">{emp.name}</div>
                    </div>
                  </td>
                  <td><strong>{emp.employeeId}</strong></td>
                  <td>
                    <div className="emp-contact-cell">
                      <span>{emp.email}</span>
                      <span className="text-muted text-xs">{emp.phone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="emp-dept-cell">
                      <span>{emp.department}</span>
                      <span className="text-muted text-xs">{emp.position}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${emp.status}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    {new Date(emp.joinDate).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon btn-edit" onClick={() => navigate(`/edit-employee/${emp.id}`)} title="Edit">
                        ✏️
                      </button>
                      <button className="btn-icon btn-delete" onClick={() => setDeleteId(emp.id)} title="Delete">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div className="icon">🔍</div>
            <h3>No employees found</h3>
            <p>We couldn't find any employees matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
              <button className="modal-close" onClick={() => setDeleteId(null)}>✕</button>
            </div>
            <div className="modal-body mb-4">
              <p>Are you sure you want to remove this employee? This action cannot be undone.</p>
            </div>
            <div className="modal-footer flex gap-3 justify-between">
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Yes, Delete Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
