import {
  createEmployee,
  updateEmployee
} from "../redux/actions.ts";
import React from "react";

export type EmployeeState = {
  employees: Employee[];
  deletedEmployees: Employee[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  errors: {
    name: string;
    message: string;
    payload: ValidationErrorPayload;
  };
  totalPages: number;
};


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

export interface CreateEmployee extends Omit<Employee, '_id'> {
}

export interface UpdateEmployee extends Omit<Employee, '_id'> {
}

export type APIErrorResponse = {
  error: string;
  statusCode: number;
  message: string[];
};

export type CreateEmployeeResponse =
  CreateEmployee
  | APIErrorResponse;

export type EmployeeAction =
  ReturnType<typeof createEmployee.fulfilled>
  | ReturnType<typeof createEmployee.rejected>
  | ReturnType<typeof updateEmployee.fulfilled>
  | ReturnType<typeof updateEmployee.rejected>;

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

export interface EmployeeFormProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent) => Promise<void>;
  formType: "create" | "update";
  selectedEmployeeId: string | null;
  setSelectedEmployeeId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedEmployee: CreateEmployee;
  setFormEmployee: React.Dispatch<React.SetStateAction<CreateEmployee>>;
  formErrors: ValidationErrorPayload;
  formResult: "failure" | "success" | null;
}

// export interface EmployeeFieldGroupProps {
//   formFields: FieldProps[];
//   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   selectedEmployee: CreateEmployee;
//   errorMap: (fieldName: string, fieldValue: string) => boolean;
//   getFieldError: (fieldName: string) => string | null;
//   groupField: FieldType[];
// }

export interface EmployeeFieldGroupProps {
  // formFields: FieldType[][];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // selectedEmployee: CreateEmployee;
  // errorMap: (fieldName: string, fieldValue: string) => boolean;
  // getFieldError: (fieldName: string) => string | null;
}

export interface FieldProps {
  label: string;
  name: string;
  type: "text" | "date";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
}

// export type FieldProps = FieldType & {
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   error: string | null;
// };

export type FieldType = {
  label: string;
  name: string;
  type: "text" | "date" | "number" | "checkbox";
  value: string;
};