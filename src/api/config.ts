const employeesRoute = 'employees';
let API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}:${import.meta.env.VITE_PORT}/${employeesRoute}`;

if (process.env.NODE_ENV === 'test') {
  API_BASE_URL = "http://mockurl:3000/employees";
}

export const ENDPOINTS = {
  CREATE_EMPLOYEE: `${API_BASE_URL}`,
  GET_EMPLOYEES: `${API_BASE_URL}`,
  GET_EMPLOYEE_BY_ID: (id: string) => `${API_BASE_URL}/id/${id}`,
  GET_DELETED_EMPLOYEES: `${API_BASE_URL}/deleted`,
  UPDATE_EMPLOYEE: (id: string) => `${API_BASE_URL}/${id}`,
  SOFT_DELETE_EMPLOYEE: (id: string) => `${API_BASE_URL}/soft-delete/${id}`,
  DELETED_EMPLOYEES: `${API_BASE_URL}/deleted`,
  DB_CLEANUP: `${API_BASE_URL}/db-cleanup`
};