import {configureStore} from '@reduxjs/toolkit';
import employeeReducer from '../features/employees/employeeSlice';

export const store = configureStore({
  reducer: {
    employee: employeeReducer
  }
});

