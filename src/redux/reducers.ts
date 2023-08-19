import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Employee,
  EmployeeState, ValidationErrorPayload,
} from '../types';
import {
  fetchEmployees,
  softDeleteEmployee,
  fetchEmployeeById,
  createEmployee,
  getDeletedEmployees
} from './actions';

const initialState: EmployeeState = {
  employees: [],
  deletedEmployees: [],
  status: 'idle',
  totalPages: 0,
  limit: 10,
  errors: {
    name: '',
    message: '',
    payload: {},
  },
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    employeesFetched(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
      state.errors = {
        name: '',
        message: '',
        payload: {}
      };
    },
    employeeFetchError(state, action: PayloadAction<string>) {
      state.errors = {
        name: 'Fetch Error',
        message: action.payload,
        payload: {}
      };
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.status = 'loading';
        state.errors = {
          name: '',
          message: '',
          payload: {}
        };
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees.push(action.payload as Employee);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = {
          name: 'Create Employee Error',
          message: action.error.message || 'Failed to create employee.',
          payload: action.payload as ValidationErrorPayload,
        };
      })
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload.employees;
        if (action.meta && action.meta.arg && typeof action.meta.arg.limit === 'number') {
          state.limit = action.meta.arg.limit;
        }
        state.totalPages = Math.ceil(action.payload.count / state.limit);
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = {
          name: 'Fetch Error',
          message: action.error.message || 'Failed to fetch employees.',
          payload: {}
        };
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
        state.errors = {
          name: 'Fetch by ID Error',
          message: action.error.message || 'Failed to fetch employee by ID.',
          payload: {}
        };
      })
      .addCase(softDeleteEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(softDeleteEmployee.fulfilled, (state, action) => {
        const employeeId = action.payload.id;
        state.employees = state.employees.map(emp =>
          emp._id === employeeId ? {
            ...emp,
            isDeleted: true
          } : emp
        );
      })
      .addCase(softDeleteEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = {
          name: 'Soft Delete Error',
          message: action.error.message || 'Failed to soft-delete employee.',
          payload: {}
        };
      })
      .addCase(getDeletedEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDeletedEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deletedEmployees = action.payload.employees;
      })
      .addCase(getDeletedEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = {
          name: 'Fetch Deleted Error',
          message: action.error.message || 'Failed to fetch deleted employees.',
          payload: {}
        };
      })
  }
});

export default employeeSlice.reducer;
export const {
  employeesFetched,
  employeeFetchError
} = employeeSlice.actions;