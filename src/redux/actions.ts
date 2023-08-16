import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  Employee,
  CreateEmployee,
  UpdateEmployee,
  EmployeeResponse } from '../types';
import { ENDPOINTS } from '../api/config.ts';

export const fetchEmployees = createAsyncThunk(
  'employees/fetchAll',
  async (params: { page?: number, limit?: number } = {}) => {
    const response = await axios.get<EmployeeResponse>(ENDPOINTS.GET_EMPLOYEES, {
      params: params
    });
    // console.log('response.data.employees', response.data.employees);
    return response.data.employees;
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
      // Reject with error so you can handle it in a rejected reducer later if needed
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createEmployee = createAsyncThunk(
  'employees/create',
  async (employeeData: { name: string; email: string }) => {
    const response = await axios.post<CreateEmployee>(ENDPOINTS.CREATE_EMPLOYEE, employeeData);
    return response.data;
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/update',
  async (updateData: { id: string; name?: string; email?: string }, thunkAPI) => {
    try {
      const response = await axios.put<UpdateEmployee>(ENDPOINTS.UPDATE_EMPLOYEE(updateData.id), {
        name: updateData.name,
        email: updateData.email
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating employee (${updateData.id}):`, error);
      // Reject with error so you can handle it in a rejected reducer later if needed
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const softDeleteEmployee = createAsyncThunk(
  'employees/softDelete',
  async (id: string, thunkAPI) => {
    try {
      return { id };
    } catch (error) {
      console.error(`Error soft-deleting employee (${id}):`, error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);