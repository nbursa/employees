import {createEmployee, updateEmployee} from "../redux/actions.ts";

export interface EmployeeResponse {
  employees: Employee[];
  count: number;
}

export interface HomeAddress {
  city: string;
  ZIPCode: string;
  addressLine1: string;
  addressLine2: string;
  _id?: string;
}

export interface Employee {
  _id: string | null;
  name: string;
  email: string;
  phoneNumber: string;
  homeAddress: HomeAddress;
  dateOfEmployment: string;
  dateOfBirth: string;
  isDeleted: boolean;
  deletedAt: string | null;
  __v?: number;
}

export interface CreateEmployee extends Omit<Employee, '_id'> {}

export interface UpdateEmployee extends Omit<Employee, '_id'> {}

export type APIErrorResponse = {
  error: string;
  statusCode: number;
  message: string[];
};

export type CreateEmployeeResponse = CreateEmployee | APIErrorResponse;

export type EmployeeAction = ReturnType<typeof createEmployee.fulfilled> | ReturnType<typeof createEmployee.rejected> | ReturnType<typeof updateEmployee.fulfilled> | ReturnType<typeof updateEmployee.rejected>;

export interface ValidationErrorPayload {
  name?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  dateOfEmployment?: string;
  homeAddress_city?: string;
  homeAddress_Invalid?: string;
  homeAddress_ZIPCode?: string;
  homeAddress_addressLine1?: string;
  [key: string]: string | undefined;
}