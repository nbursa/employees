import React, {useEffect} from 'react';
import {Button, FormControl, InputLabel, FormGroup, Select, MenuItem} from '@mui/material';
import {CreateEmployee, Employee, ValidationErrorPayload} from "../../types";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import FormControlComponent from './FormControlComponent';

interface EmployeeFormProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  formType: 'create' | 'update';
  selectedEmployeeId: string | null;
  setSelectedEmployeeId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedEmployee: CreateEmployee;
  setFormEmployee: React.Dispatch<React.SetStateAction<CreateEmployee>>;
  formErrors: ValidationErrorPayload;
}

const defaultNewEmployee: CreateEmployee = {
  name: '',
  email: '',
  phoneNumber: '',
  dateOfEmployment: new Date().toISOString().substring(0, 10),
  dateOfBirth: new Date().toISOString().substring(0, 10),
  homeAddress: {
    city: '',
    ZIPCode: '',
    addressLine1: '',
    addressLine2: ''
  },
  isDeleted: false,
  deletedAt: null
};


const EmployeeForm: React.FC<EmployeeFormProps> = ({
                                                     formType, handleInputChange, handleFormSubmit, selectedEmployeeId, setSelectedEmployeeId,
                                                     selectedEmployee, setFormEmployee, formErrors
                                                   }) => {
  const employees = useSelector((state: RootState) => state.employees.employees);

  const getFieldError = (fieldName: string): string | null => {
    return formErrors[fieldName] || null;
  };

  const errorMap = (fieldName: string, fieldValue: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneNumberRegex = /^\+\d{11,12}$/;
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/;

    switch (fieldName) {
      case 'name':
        return fieldValue.length < 3;
      case 'email':
        return !emailRegex.test(fieldValue);
      case 'phoneNumber':
        return !phoneNumberRegex.test(fieldValue);
      case 'dateOfEmployment':
        return !dateTimeRegex.test(fieldValue);
      case 'dateOfBirth':
        return !dateTimeRegex.test(fieldValue);
      case 'homeAddress.city':
        return fieldValue.length === 0;
      case 'homeAddress.ZIPCode':
        return fieldValue.length !== 5;
      case 'homeAddress.addressLine1':
        return fieldValue.length > 0;
      default:
        return false;
    }
  };

  const toISODateString = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }
    return date.toISOString();
  };

  const formFields = [
    {label: "Name", name: "name", type: "text", value: selectedEmployee.name},
    {label: "Email", name: "email", type: "text", value: selectedEmployee.email},
    {label: "Phone Number", name: "phoneNumber", type: "text", value: selectedEmployee.phoneNumber},
    {label: "Date of Employment", name: "dateOfEmployment", type: "date", value: toISODateString(selectedEmployee.dateOfEmployment)},
    {label: "Date of Birth", name: "dateOfBirth", type: "date", value: toISODateString(selectedEmployee.dateOfBirth)},
    {label: "City", name: "homeAddress.city", type: "text", value: selectedEmployee.homeAddress.city},
    {label: "ZIP Code", name: "homeAddress.ZIPCode", type: "text", value: selectedEmployee.homeAddress.ZIPCode},
    {label: "Address Line 1", name: "homeAddress.addressLine1", type: "text", value: selectedEmployee.homeAddress.addressLine1},
    {label: "Address Line 2", name: "homeAddress.addressLine2", type: "text", value: selectedEmployee.homeAddress.addressLine2}
  ];

  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  useEffect(() => {
    if (selectedEmployeeId) {
      const foundEmployee = employees.find(emp => emp._id === selectedEmployeeId);
      setFormEmployee(foundEmployee || defaultNewEmployee);
    } else {
      setFormEmployee(defaultNewEmployee);
    }
  }, [selectedEmployeeId, employees, setFormEmployee]);

  return (
    <form onSubmit={handleFormSubmit} className="mb-4 flex flex-col items-baseline gap-2">
      <h3 className="text-xl font-bold mb-2">{capitalizeFirstLetter(formType)} Employee</h3>

      <FormGroup className="container mx-auto px-4 flex flex-col">
        {formType === 'update' && (
          <FormControl className="mb-4 w-full" margin="normal">
            <InputLabel className="text-sm font-medium text-gray-700">Select Employee to Update</InputLabel>
            <Select
              value={selectedEmployeeId || ''}
              onChange={e => setSelectedEmployeeId(e.target.value as string)}
              className="mt-1 p-2 border rounded-md w-full"
            >
              {employees.map((emp: Employee) => (
                <MenuItem key={emp._id || undefined} value={emp._id || ''} className="py-2">{emp.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {formFields.map(field => (
          <FormControlComponent
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={field.value}
            onChange={handleInputChange}
            error={errorMap(field.name, field.value) ? getFieldError(field.name) : null}
          />
        ))}
      </FormGroup>

      <Button type="submit" variant="contained" color="primary">
        {`${formType} Employee`}
      </Button>
    </form>
  );

}

export default EmployeeForm;