/**
 * EmployeeList Component
 * 
 * Displays all employees in a table format with options to:
 * - View employee details
 * - Edit employee
 * - Delete employee
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllEmployees,
  selectIsLoading,
  deleteEmployee,
  selectEmployee,
  setLoading
} from '../../redux/slices/employeeSlice';
import { showNotification, showLoading, hideLoading } from '../../redux/slices/uiSlice';
import './Employee.css';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector(selectAllEmployees);
  const isLoading = useSelector(selectIsLoading);

  const handleEdit = (employee) => {
    dispatch(selectEmployee(employee));
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      dispatch(showLoading());
      dispatch(setLoading(true));
      
      // Simulate async deletion
      setTimeout(() => {
        dispatch(deleteEmployee(id));
        dispatch(hideLoading());
        dispatch(showNotification({
          message: `${name} has been deleted successfully`,
          type: 'success'
        }));
      }, 500);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading employees...</div>;
  }

  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Employees Found</h3>
        <p>Add your first employee using the form above.</p>
      </div>
    );
  }

  return (
    <div className="employee-list">
      <h2>Employee Directory</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Join Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>${employee.salary.toLocaleString()}</td>
              <td>{new Date(employee.joinDate).toLocaleDateString()}</td>
              <td className="actions">
                <button
                  className="btn btn-edit"
                  onClick={() => handleEdit(employee)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(employee.id, employee.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
