import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';

/**
 * EmployeeForm is used both for adding a new employee and for editing an existing one.
 * It manages form state locally, checks validations, and calls respective Context API methods.
 */
export default function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEmployee, updateEmployee, getEmployee } = useEmployees();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Engineering',
    position: '',
    joinDate: new Date().toISOString().split('T')[0],
    salary: '',
    status: 'active',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const emp = getEmployee(Number(id));
      if (emp) {
        setForm(emp);
      } else {
        navigate('/employees');
      }
    }
  }, [id, isEdit, getEmployee, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.position.trim()) newErrors.position = 'Position is required';
    if (!form.salary || isNaN(form.salary) || Number(form.salary) <= 0) newErrors.salary = 'Valid salary is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      if (isEdit) {
        updateEmployee(Number(id), form);
      } else {
        addEmployee(form);
      }
      setLoading(false);
      navigate('/employees');
    }, 600);
  };

  return (
    <div className="employee-form-page page-enter">
      <div className="list-header" style={{ marginBottom: '24px' }}>
        <div>
          <h2 className="list-title">{isEdit ? 'Edit Employee' : 'Add New Employee'}</h2>
          <p className="list-subtitle">
            {isEdit ? 'Update existing employee records' : 'Fill in the information to onboard a new employee'}
          </p>
        </div>
      </div>

      <div className="card card-elevated" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid-2" style={{ marginBottom: '20px' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? 'error' : ''}`}
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Jane Doe"
              />
              {errors.name && <div className="form-error">⚠ {errors.name}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? 'error' : ''}`}
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. jane@corpx.com"
              />
              {errors.email && <div className="form-error">⚠ {errors.email}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phone"
                className={`form-control ${errors.phone ? 'error' : ''}`}
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
              />
              {errors.phone && <div className="form-error">⚠ {errors.phone}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Join Date</label>
              <input
                type="date"
                name="joinDate"
                className="form-control"
                value={form.joinDate.split('T')[0]}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Department</label>
              <select
                name="department"
                className="form-control"
                value={form.department}
                onChange={handleChange}
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Management">Management</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Position / Title</label>
              <input
                type="text"
                name="position"
                className={`form-control ${errors.position ? 'error' : ''}`}
                value={form.position}
                onChange={handleChange}
                placeholder="e.g. Senior Developer"
              />
              {errors.position && <div className="form-error">⚠ {errors.position}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Annual Salary ($)</label>
              <input
                type="number"
                name="salary"
                className={`form-control ${errors.salary ? 'error' : ''}`}
                value={form.salary}
                onChange={handleChange}
                placeholder="e.g. 85000"
              />
              {errors.salary && <div className="form-error">⚠ {errors.salary}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-control"
                value={form.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on-leave">On Leave</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/employees')}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <><span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} /> Saving...</>
              ) : isEdit ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
