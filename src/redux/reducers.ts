import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../types';
import {fetchEmployees, softDeleteEmployee, fetchEmployeeById} from './actions';

type EmployeeState = {
  employees: Employee[];
  deletedEmployees: Employee[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
};

const initialState: EmployeeState = {
  employees: [],
  deletedEmployees: [],
  status: 'idle',
  error: undefined
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    employeesFetched(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
      state.error = undefined;
    },
    employeeFetchError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch employees.';
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Assuming your API returns the employee as part of the response data.
        // Adjust as needed.
        const employee = action.payload;
        state.employees = [...state.employees.filter(emp => emp._id !== employee._id), employee];
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch employee by ID.';
      })
      .addCase(softDeleteEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(softDeleteEmployee.fulfilled, (state, action) => {
          state.status = 'succeeded';
          const employeeToDelete = state.employees.find(emp => emp._id === action.payload.id);
          if (employeeToDelete) {
            state.deletedEmployees.push(employeeToDelete);
          }
          state.employees = state.employees.filter(emp => emp._id !== action.payload.id);
      })
      .addCase(softDeleteEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to soft-delete employee.';
      })
  }
});

export default employeeSlice.reducer;
export const { employeesFetched, employeeFetchError } = employeeSlice.actions;