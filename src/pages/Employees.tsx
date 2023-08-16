import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, FormControl, Input, InputLabel, Select, MenuItem, FormGroup, Tabs, Tab, Box} from '@mui/material';
import {AppDispatch, RootState} from '../redux/store';
import { fetchEmployees, createEmployee, updateEmployee, softDeleteEmployee } from '../redux/actions';
import {CreateEmployee} from "../types";
import EmployeeForm from "../components/form/EmployeeForm.tsx";
import DeleteForm from "../components/form/DeleteForm.tsx";

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
  const employees = useSelector((state: RootState) => state.employees?.employees);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [newEmployee, setNewEmployee] = useState<CreateEmployee>(defaultNewEmployee);
  const error = useSelector((state: RootState)=> state.employees?.error);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(fetchEmployees({}));
  }, [dispatch]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setNewEmployee(prev => ({ ...prev, [name]: value }));
  // };
  //
  // const handleFormSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   dispatch(createEmployee(newEmployee));
  //   setNewEmployee(defaultNewEmployee);
  // };

  // const handleUpdateEmployee = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (selectedEmployeeId) {
  //     dispatch(updateEmployee({ id: selectedEmployeeId, ...newEmployee }));
  //   }
  // };

  // const handleSoftDelete = () => {
  //   if (selectedEmployeeId) {
  //     dispatch(softDeleteEmployee(selectedEmployeeId));
  //   }
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmployeeId) {
      return dispatch(updateEmployee({ id: selectedEmployeeId, ...newEmployee }));
    }
    dispatch(createEmployee(newEmployee));
    return setNewEmployee(defaultNewEmployee);
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Employees</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <pre className="block sm:inline"> {error}</pre>
        </div>
      )}

      <Tabs value={activeTab} onChange={handleChangeTab}>
        <Tab label="Create Employee" />
        <Tab label="Update Employee" />
        <Tab label="Delete Employee" />
      </Tabs>

      <Box hidden={activeTab !== 0} padding={3}>
        <EmployeeForm
          formType="create"
          employee={newEmployee}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
        />
      </Box>

      <Box hidden={activeTab !== 1} padding={3}>
        <EmployeeForm
          formType="update"
          employee={employees.find(emp => emp._id === selectedEmployeeId) || defaultNewEmployee}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
        />
      </Box>


      <Box hidden={activeTab !== 2} padding={3}>
        <DeleteForm />
      </Box>
    </div>
  );

};

export default Employees;