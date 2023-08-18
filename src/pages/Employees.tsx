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
// import EmployeeForm
//   from "../components/form/EmployeeForm.tsx";
import DeleteForm from "../components/form/DeleteForm.tsx";
import NewEmployeeForm
  from "../components/form/NewEmployeeForm.tsx";
import {toast} from "react-toastify";
import {
  EmployeeFormProvider
} from '../contexts/EmployeeFormContext';

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

  // const isErrorPayload = (payload: unknown): payload is ValidationErrorPayload => {
  //   return (payload && (payload as ValidationErrorPayload).errorMessage !== undefined) as boolean;
  // };

  // const handleFormSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //
  //   try {
  //     let action;
  //     if (selectedEmployeeId) {
  //       action = await dispatch(updateEmployee({id: selectedEmployeeId, ...formEmployee}));
  //     } else {
  //       action = await dispatch(createEmployee(formEmployee as CreateEmployee));
  //     }
  //
  //     if (isErrorPayload(action.payload)) {
  //       setFormErrors(action.payload);
  //       return setFormResult("failure");
  //     } else {
  //       setFormErrors({});
  //       return setFormResult("success");
  //     }
  //   } catch (error) {
  //     console.error("Error while handling the form submission:", error);
  //     return setFormResult("failure");
  //   }
  // };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let action;
    if (selectedEmployeeId) {
      action = await dispatch(updateEmployee({id: selectedEmployeeId, ...formEmployee}));
    } else {
      action = await dispatch(createEmployee(formEmployee as CreateEmployee));
    }

    if (createEmployee.fulfilled.match(action) || updateEmployee.fulfilled.match(action)) {
      setFormErrors({});
      setFormResult("success");
      toast.success("Operation successful!");
    } else if (createEmployee.rejected.match(action) || updateEmployee.rejected.match(action)) {
      if (action.payload && typeof action.payload === 'object') {
        return setFormErrors(action.payload);
        // Displaying validation errors
        // for (const key in action.payload) {
        //   toast.error(`${key}: ${action.payload[key]}`);
        // }
      } else {
        console.error("Error while handling the form submission:", action.error);
        toast.error(`Error while handling the form submission: ${action.error.message}`);
      }
      setFormResult("failure");
    }
  };

  // const handleFormSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //
  //   let action;
  //   if (selectedEmployeeId) {
  //     action = await dispatch(updateEmployee({id: selectedEmployeeId, ...formEmployee}));
  //   } else {
  //     action = await dispatch(createEmployee(formEmployee as CreateEmployee));
  //     console.log("action", action);
  //   }
  //
  //   if (createEmployee.fulfilled.match(action) || updateEmployee.fulfilled.match(action)) {
  //     setFormErrors({});
  //     setFormResult("success");
  //     toast.success("Operation successful!");
  //   } else if (createEmployee.rejected.match(action) || updateEmployee.rejected.match(action)) {
  //     // setFormErrors(action.payload);
  //     if (isErrorPayload(action.payload)) {
  //       console.log('action.payload', action.payload)
  //       setFormErrors(action.payload);
  //       // Displaying validation errors
  //       for (const key in action.payload) {
  //         toast.error(`${key}: ${action.payload[key]}`);
  //       }
  //     } else {
  //       console.error("Error while handling the form submission:", action.error);
  //       toast.error(`Error while handling the form submission: ${action.error.message}`);
  //     }
  //     setFormResult("failure");
  //   }
  // };


  return (
    <div className="container mx-auto px-4">
      <h3 className="text-xl font-bold my-2">Manage
        Employees</h3>

      <Tabs value={activeTab} onChange={handleChangeTab}>
        <Tab label="Create"/>
        <Tab label="Update"/>
        <Tab label="Delete"/>
      </Tabs>

      <EmployeeFormProvider value={{
        handleInputChange,
        formErrors, /* other values */
      }}>
        <Box hidden={activeTab !== 0}>
          <NewEmployeeForm formType="create"/>
        </Box>

        <Box hidden={activeTab !== 1}>
          <NewEmployeeForm formType="update"/>
        </Box>

        <Box hidden={activeTab !== 2}>
          <DeleteForm/>
        </Box>
      </EmployeeFormProvider>
    </div>
  );


};

export default Employees;