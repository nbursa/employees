import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Tabs, Tab, Box} from '@mui/material';
import {AppDispatch, RootState} from '../redux/store';
import { fetchEmployees, createEmployee, updateEmployee } from '../redux/actions';
import {CreateEmployee, Employee, HomeAddress} from "../types";
import EmployeeForm from "../components/form/EmployeeForm.tsx";
import DeleteForm from "../components/form/DeleteForm.tsx";
import NoResults from "../components/NoResults.tsx";

const Employees: React.FC = () => {
  const defaultNewEmployee: CreateEmployee = {
    name: '',
    email: '',
    phoneNumber: '',
    homeAddress: {
      city: '',
      ZIPCode: '',
      addressLine1: '',
      addressLine2: ''
    },
    dateOfEmployment: '',
    dateOfBirth: '',
    isDeleted: false,
    deletedAt: null
  };
  const dispatch = useDispatch<AppDispatch>();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [newEmployee, setNewEmployee] = useState<CreateEmployee>(defaultNewEmployee);
  const error = useSelector((state: RootState)=> state.employees?.error);
  const [activeTab, setActiveTab] = useState(0);
  const employees = useSelector((state: RootState) => state.employees?.employees);
  const [formEmployee, setFormEmployee] = useState<CreateEmployee>(defaultNewEmployee);

  useEffect(() => {
    dispatch(fetchEmployees({}));
  }, [dispatch]);

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setNewEmployee(prev => ({ ...prev, [name]: value }));
  // }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [key, nestedKey] = name.split('.');
      if (key === 'homeAddress') {
        setFormEmployee(prev => ({
          ...prev,
          homeAddress: {
            ...prev.homeAddress,
            [nestedKey as keyof HomeAddress]: value
          }
        }));
      }
    } else {
      setFormEmployee(prev => ({
        ...prev,
        [name as keyof Omit<Employee, 'homeAddress'>]: value
      }));
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmployeeId) {
      return dispatch(updateEmployee({ id: selectedEmployeeId, ...newEmployee }));
    }
    dispatch(createEmployee(newEmployee));
    return setNewEmployee(defaultNewEmployee);
  }
  console.log('employees', employees);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Employees</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <pre className="block sm:inline"> {error}</pre>
        </div>
      )}

      {employees && employees.length === 0 && (
        <NoResults/>
      )}

      <Tabs value={activeTab} onChange={handleChangeTab}>
        <Tab label="Create Employee" />
        <Tab label="Update Employee" />
        <Tab label="Delete Employee" />
      </Tabs>

      <Box hidden={activeTab !== 0} padding={3}>
        <EmployeeForm
          formType="create"
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          selectedEmployeeId={null}
          setSelectedEmployeeId={() => {}}
          selectedEmployee={formEmployee}
          setFormEmployee={setFormEmployee}
        />
      </Box>

      <Box hidden={activeTab !== 1} padding={3}>
        <EmployeeForm
          formType="update"
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          selectedEmployeeId={selectedEmployeeId}
          setSelectedEmployeeId={setSelectedEmployeeId}
          selectedEmployee={formEmployee}
          setFormEmployee={setFormEmployee}
        />

      </Box>

      <Box hidden={activeTab !== 2} padding={3}>
        <DeleteForm />
      </Box>
    </div>
  );

};

export default Employees;