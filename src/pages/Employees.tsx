import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Tabs, Tab, Box} from '@mui/material';
import {AppDispatch} from '../redux/store';
import {
  fetchEmployees,
  createEmployee,
  updateEmployee
} from '../redux/actions';
import {
  CreateEmployee,
  Employee,
  HomeAddress,
  ValidationErrorPayload
} from "../types";
import EmployeeForm
  from "../components/form/EmployeeForm.tsx";
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
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [formEmployee, setFormEmployee] = useState<CreateEmployee>(defaultNewEmployee);
  const [formErrors, setFormErrors] = useState<ValidationErrorPayload>({});
  const [formResult, setFormResult] = useState<'failure' | 'success' | null>(null);

  useEffect(() => {
    dispatch(fetchEmployees({}));
  }, [dispatch]);

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
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

  const isErrorPayload = (payload: unknown): payload is ValidationErrorPayload => {
    return (payload && (payload as ValidationErrorPayload).errorMessage !== undefined) as boolean;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let action;
      if (selectedEmployeeId) {
        action = await dispatch(updateEmployee({id: selectedEmployeeId, ...formEmployee}));
      } else {
        action = await dispatch(createEmployee(formEmployee as CreateEmployee));
      }

      if (isErrorPayload(action.payload)) {
        setFormErrors(action.payload);
        return setFormResult("failure");
      } else {
        setFormErrors({});
        return setFormResult("success");
      }
    } catch (error) {
      console.error("Error while handling the form submission:", error);
      return setFormResult("failure");
    }
  };


  return (
    <div className="container mx-auto px-4">
      <h3 className="text-xl font-bold my-2">Manage
        Employees</h3>

      <Tabs value={activeTab} onChange={handleChangeTab}>
        <Tab label="Create"/>
        <Tab label="Update"/>
        <Tab label="Delete"/>
      </Tabs>

      <Box hidden={activeTab !== 0}>
        <EmployeeForm
          formType="create"
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          selectedEmployeeId={null}
          setSelectedEmployeeId={() => {
          }}
          selectedEmployee={formEmployee}
          setFormEmployee={setFormEmployee}
          formErrors={formErrors as ValidationErrorPayload}
          formResult={formResult}
        />
      </Box>

      <Box hidden={activeTab !== 1}>
        <EmployeeForm
          formType="update"
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          selectedEmployeeId={selectedEmployeeId}
          setSelectedEmployeeId={setSelectedEmployeeId}
          selectedEmployee={formEmployee}
          setFormEmployee={setFormEmployee}
          formErrors={formErrors as ValidationErrorPayload}
          formResult={formResult}
        />

      </Box>

      <Box hidden={activeTab !== 2}>
        <DeleteForm/>
      </Box>
    </div>
  );

};

export default Employees;