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
  _id: string;
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