import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Employee} from '../types';
import {fetchEmployees, softDeleteEmployee, fetchEmployeeById, createEmployee} from './actions';

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
  name: 'employees',
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
      .addCase(createEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees.push(action.payload as Employee);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to create employee.';
      })
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
        console.log('fetchEmployees.rejected', action.error.message || 'Failed to fetch employees.')
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.status = 'succeeded';
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
        const employeeId = action.payload.id;
        const employee = state.employees.find(e => e._id === employeeId);
        if (employee) {
          employee.isDeleted = true;
        }
      })
      .addCase(softDeleteEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to soft-delete employee.';
      })

  }
});

export default employeeSlice.reducer;
export const {employeesFetched, employeeFetchError} = employeeSlice.actions;