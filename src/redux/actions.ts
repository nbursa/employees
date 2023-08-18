import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  CreateEmployee,
  CreateEmployeeResponse,
  Employee,
  EmployeeResponse,
  UpdateEmployee,
  ValidationErrorPayload
} from '../types';
import {ENDPOINTS} from '../api/config.ts';

export const fetchEmployees = createAsyncThunk(
  'employees/fetchAll',
  async (params: {
    page?: number,
    limit?: number
  } = {}, thunkAPI) => {
    try {
      const response = await axios.get<EmployeeResponse>(ENDPOINTS.GET_EMPLOYEES, {
        params: params
      });
      return response.data.employees;
    } catch (error) {
      console.error('Error fetching employees:', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  'employees/fetchById',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get<Employee>(ENDPOINTS.GET_EMPLOYEE_BY_ID(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching employee by ID (${id}):`, error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const createEmployee = createAsyncThunk(
//   'employees/create',
//   async (employeeData: CreateEmployee, thunkAPI) => {
//     try {
//       const response = await axios.post<CreateEmployeeResponse>(ENDPOINTS.CREATE_EMPLOYEE, employeeData);
//       return response.data;
//
//     } catch (error: any) {
//       console.error('Error while creating employee:', error);
//       // Handle specific error format returned from the backend
//       if (error.response && error.response.data && Array.isArray(error.response.data.message)) {
//         // Parsing field-specific error messages
//         const errorMessages = error.response.data.message;
//         const errors: ValidationErrorPayload = {};
//         errorMessages.forEach((errorMsg: string) => {
//           const spaceIndex = errorMsg.indexOf(' ');
//           const field = errorMsg.substring(0, spaceIndex)
//           errors[field] = errorMsg.substring(spaceIndex + 1);
//         });
//         console.log('thunkAPI errors', errors);
//         return errors;
//       }
//
//       // Generic error handling
//       return thunkAPI.rejectWithValue(error.message || 'Unexpected error occurred.');
//     }
//   }
// );

export const createEmployee = createAsyncThunk(
  'employees/create',
  async (employeeData: CreateEmployee, thunkAPI) => {
    try {
      const response = await axios.post<CreateEmployeeResponse>(ENDPOINTS.CREATE_EMPLOYEE, employeeData);
      return response.data;

    } catch (error: any) {
      // console.error('Error while creating employee:', error);

      // Check if the error has a specific format returned from the backend
      if (error.response && error.response.data && Array.isArray(error.response.data.message)) {
        // Parsing field-specific error messages
        const errorMessages = error.response.data.message;
        const errors: ValidationErrorPayload = {};
        errorMessages.forEach((errorMsg: string) => {
          const spaceIndex = errorMsg.indexOf(' ');
          const field = errorMsg.substring(0, spaceIndex)
          errors[field] = errorMsg.substring(spaceIndex + 1);
        });
        // console.log('thunkAPI errors', errors);
        return thunkAPI.rejectWithValue(errors);
      }

      // Generic error handling
      return thunkAPI.rejectWithValue('Unexpected error occurred.');
    }
  }
);


export const updateEmployee = createAsyncThunk(
  'employees/update',
  async (updateData: {
    id: string;
    name?: string;
    email?: string
  }, thunkAPI) => {
    try {
      const response = await axios.patch<UpdateEmployee>(ENDPOINTS.UPDATE_EMPLOYEE(updateData.id), updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating employee (${updateData.id}):`, error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const softDeleteEmployee = createAsyncThunk(
  'employees/softDelete',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.delete(ENDPOINTS.SOFT_DELETE_EMPLOYEE(id));
      return response.data;
    } catch (error) {
      console.error(`Error soft-deleting employee (${id}):`, error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getDeletedEmployees = createAsyncThunk(
  'employees/fetchDeleted',
  async (params: {
    page?: number,
    limit?: number
  } = {}, thunkAPI) => {
    try {
      const response = await axios.get<{
        employees: Employee[],
        count: number
      }>(ENDPOINTS.GET_DELETED_EMPLOYEES, {
        params: params
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching deleted employees:', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);