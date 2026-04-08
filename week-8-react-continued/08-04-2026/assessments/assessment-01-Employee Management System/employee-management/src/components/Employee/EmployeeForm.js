/**
 * EmployeeForm Component
 * 
 * A form component for adding new employees or editing existing ones.
 * Demonstrates:
 * - Dispatching Redux actions
 * - Controlled form inputs
 * - Form validation
 */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addEmployee,
  updateEmployee,
  selectSelectedEmployee,
  clearSelectedEmployee,
  setLoading
} from '../../redux/slices/employeeSlice';
import { showNotification, showLoading, hideLoading } from '../../redux/slices/uiSlice';
import './Employee.css';

const initialFormState = {
  name: '',
  email: '',
  department: '',
  position: '',
  salary: '',
  joinDate: ''
};

const departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Sales', 'Operations'];

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector(selectSelectedEmployee);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // Populate form when editing an employee
  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        ...selectedEmployee,
        salary: selectedEmployee.salary.toString()
      });
    } else {
      setFormData(initialFormState);
    }
  }, [selectedEmployee]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(formData.salary) || parseFloat(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }

    if (!formData.joinDate) {
      newErrors.joinDate = 'Join date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(showLoading());
    dispatch(setLoading(true));

    const employeeData = {
      ...formData,
      salary: parseFloat(formData.salary)
    };

    // Simulate async operation
    setTimeout(() => {
      if (selectedEmployee) {
        // Update existing employee
        dispatch(updateEmployee({ ...employeeData, id: selectedEmployee.id }));
        dispatch(showNotification({
          message: `${employeeData.name} has been updated successfully`,
          type: 'success'
        }));
      } else {
        // Add new employee
        dispatch(addEmployee(employeeData));
        dispatch(showNotification({
          message: `${employeeData.name} has been added successfully`,
          type: 'success'
        }));
      }
      dispatch(hideLoading());
      setFormData(initialFormState);
    }, 500);
  };

  const handleCancel = () => {
    dispatch(clearSelectedEmployee());
    setFormData(initialFormState);
    setErrors({});
  };

  return (
    <div className="employee-form-container">
      <h2>{selectedEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={errors.department ? 'error' : ''}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && <span className="error-message">{errors.department}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Enter position"
              className={errors.position ? 'error' : ''}
            />
            {errors.position && <span className="error-message">{errors.position}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="salary">Salary ($)</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter salary"
              className={errors.salary ? 'error' : ''}
            />
            {errors.salary && <span className="error-message">{errors.salary}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="joinDate">Join Date</label>
            <input
              type="date"
              id="joinDate"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              className={errors.joinDate ? 'error' : ''}
            />
            {errors.joinDate && <span className="error-message">{errors.joinDate}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {selectedEmployee ? 'Update Employee' : 'Add Employee'}
          </button>
          {selectedEmployee && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
