/**
 * Employee Slice - Redux Toolkit
 * 
 * This slice manages all employee-related state including:
 * - CRUD operations (Create, Read, Update, Delete)
 * - Loading states
 * - Error handling
 */

import { createSlice } from '@reduxjs/toolkit';

// Initial employee data for demonstration
const initialEmployees = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 85000,
    joinDate: '2022-03-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    salary: 75000,
    joinDate: '2021-07-20'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@company.com',
    department: 'HR',
    position: 'HR Specialist',
    salary: 55000,
    joinDate: '2023-01-10'
  }
];

// Load persisted state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('employees');
    if (serializedState === null) {
      return initialEmployees;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading employees from localStorage:', err);
    return initialEmployees;
  }
};

const initialState = {
  employees: loadFromLocalStorage(),
  selectedEmployee: null,
  isLoading: false,
  error: null
};

/**
 * Employee Slice using createSlice from Redux Toolkit
 * 
 * createSlice automatically generates:
 * - Action creators
 * - Action types
 * - A reducer function
 * 
 * It uses Immer internally, allowing us to write "mutating" logic
 * that is actually immutable under the hood.
 */
const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Add a new employee
    addEmployee: (state, action) => {
      const newEmployee = {
        ...action.payload,
        id: Date.now() // Generate unique ID
      };
      state.employees.push(newEmployee);
      state.isLoading = false;
      state.error = null;
    },

    // Update an existing employee
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        // Immutably update the employee (Immer handles this)
        state.employees[index] = action.payload;
      }
      state.selectedEmployee = null;
      state.isLoading = false;
      state.error = null;
    },

    // Delete an employee
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
      state.isLoading = false;
      state.error = null;
    },

    // Select an employee for editing
    selectEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },

    // Clear selected employee
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    }
  }
});

// Export actions
export const {
  setLoading,
  setError,
  clearError,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  selectEmployee,
  clearSelectedEmployee
} = employeeSlice.actions;

// Export selectors
export const selectAllEmployees = (state) => state.employees.employees;
export const selectSelectedEmployee = (state) => state.employees.selectedEmployee;
export const selectIsLoading = (state) => state.employees.isLoading;
export const selectError = (state) => state.employees.error;

// Export reducer
export default employeeSlice.reducer;
