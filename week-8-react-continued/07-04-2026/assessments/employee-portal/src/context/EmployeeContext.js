import React, { createContext, useContext, useReducer, useCallback } from 'react';

const EmployeeContext = createContext(null);

const initialEmployees = [
  { id: 1, name: 'Alice Johnson',  email: 'alice@corp.com',  department: 'Engineering', role: 'Admin',    status: 'Active',   joined: '2021-03-15' },
  { id: 2, name: 'Bob Smith',      email: 'bob@corp.com',    department: 'Marketing',   role: 'Employee', status: 'Active',   joined: '2022-07-01' },
  { id: 3, name: 'Carol Williams', email: 'carol@corp.com',  department: 'HR',          role: 'Employee', status: 'Inactive', joined: '2020-01-10' },
  { id: 4, name: 'David Brown',    email: 'david@corp.com',  department: 'Finance',     role: 'Manager',  status: 'Active',   joined: '2023-05-20' },
  { id: 5, name: 'Eva Martinez',   email: 'eva@corp.com',    department: 'Engineering', role: 'Employee', status: 'Active',   joined: '2023-11-03' },
];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, employees: [...state.employees, { ...action.payload, id: Date.now() }] };
    case 'UPDATE':
      return { ...state, employees: state.employees.map(e => e.id === action.payload.id ? action.payload : e) };
    case 'DELETE':
      return { ...state, employees: state.employees.filter(e => e.id !== action.id) };
    default:
      return state;
  }
}

export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { employees: initialEmployees });

  const addEmployee    = useCallback(emp => dispatch({ type: 'ADD', payload: emp }), []);
  const updateEmployee = useCallback(emp => dispatch({ type: 'UPDATE', payload: emp }), []);
  const deleteEmployee = useCallback(id  => dispatch({ type: 'DELETE', id }), []);

  return (
    <EmployeeContext.Provider value={{ employees: state.employees, addEmployee, updateEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export const useEmployees = () => useContext(EmployeeContext);