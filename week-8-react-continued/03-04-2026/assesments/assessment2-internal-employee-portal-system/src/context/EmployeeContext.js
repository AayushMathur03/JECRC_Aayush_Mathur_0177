import React, { createContext, useContext, useState, useCallback } from 'react';

// Initial seed employee data
const INITIAL_EMPLOYEES = [
  {
    id: 1,
    employeeId: 'EMP-001',
    name: 'Alex Johnson',
    email: 'alex.johnson@corpx.com',
    department: 'Management',
    position: 'HR Director',
    joinDate: '2020-01-15',
    salary: 120000,
    phone: '+1 (555) 001-0001',
    status: 'active',
    role: 'admin',
  },
  {
    id: 2,
    employeeId: 'EMP-002',
    name: 'Emily Carter',
    email: 'emily.carter@corpx.com',
    department: 'Engineering',
    position: 'Senior Developer',
    joinDate: '2021-03-22',
    salary: 95000,
    phone: '+1 (555) 001-0002',
    status: 'active',
    role: 'employee',
  },
  {
    id: 3,
    employeeId: 'EMP-003',
    name: 'Michael Chen',
    email: 'michael.chen@corpx.com',
    department: 'Sales',
    position: 'Sales Manager',
    joinDate: '2022-07-10',
    salary: 87000,
    phone: '+1 (555) 001-0003',
    status: 'active',
    role: 'employee',
  },
  {
    id: 4,
    employeeId: 'EMP-004',
    name: 'Sarah Williams',
    email: 'sarah.w@corpx.com',
    department: 'Finance',
    position: 'Financial Analyst',
    joinDate: '2021-11-05',
    salary: 82000,
    phone: '+1 (555) 001-0004',
    status: 'active',
    role: 'employee',
  },
  {
    id: 5,
    employeeId: 'EMP-005',
    name: 'David Kim',
    email: 'david.k@corpx.com',
    department: 'Engineering',
    position: 'DevOps Engineer',
    joinDate: '2023-02-14',
    salary: 91000,
    phone: '+1 (555) 001-0005',
    status: 'inactive',
    role: 'employee',
  },
];

let nextId = 6;

function generateEmployeeId() {
  return `EMP-${String(nextId).padStart(3, '0')}`;
}

const EmployeeContext = createContext(null);

/**
 * EmployeeProvider handles all in-memory CRUD operations for employee data.
 * It also provides global toast notification functions.
 */
export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  /**
   * CREATE: Adds a new employee, simulating creating a new record.
   * Automatically generates the next available employee ID.
   */
  const addEmployee = useCallback(
    (data) => {
      const newEmp = {
        ...data,
        id: nextId,
        employeeId: generateEmployeeId(),
        role: 'employee',
      };
      nextId++;
      setEmployees((prev) => [...prev, newEmp]);
      showToast(`Employee "${data.name}" added successfully!`, 'success');
      return newEmp;
    },
    [showToast]
  );

  /**
   * UPDATE: Updates an existing employee by their unique ID.
   */
  const updateEmployee = useCallback(
    (id, data) => {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? { ...emp, ...data } : emp))
      );
      showToast(`Employee record updated successfully!`, 'success');
    },
    [showToast]
  );

  /**
   * DELETE: Removes an employee from the in-memory array by ID.
   */
  const deleteEmployee = useCallback(
    (id) => {
      const emp = employees.find((e) => e.id === id);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
      showToast(`Employee "${emp?.name}" removed.`, 'warning');
    },
    [employees, showToast]
  );

  // GET ONE
  const getEmployee = useCallback(
    (id) => employees.find((e) => e.id === id),
    [employees]
  );

  // GET BY EMAIL (for current user lookup)
  const getEmployeeByEmail = useCallback(
    (email) => employees.find((e) => e.email === email),
    [employees]
  );

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployee,
        getEmployeeByEmail,
        toast,
        showToast,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

/**
 * Custom hook to consume the EmployeeContext.
 */
export function useEmployees() {
  const ctx = useContext(EmployeeContext);
  if (!ctx) throw new Error('useEmployees must be used within EmployeeProvider');
  return ctx;
}
