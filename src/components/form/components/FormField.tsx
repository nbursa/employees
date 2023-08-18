import React from 'react';
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText
} from '@mui/material';
import {CreateEmployee, Employee} from "../../../types";
import {capitalizeFirstLetter} from "../utils/helpers.ts";
import {
  useEmployeeForm
} from '../../../contexts/EmployeeFormContext';

interface FormControlProps {
  label: string;
  name: keyof CreateEmployee | keyof Employee | string;
  type?: string;
}

const FormField: React.FC<FormControlProps> = ({
                                                 label,
                                                 name,
                                                 type = 'text'
                                               }) => {
  const {
    handleInputChange,
    formErrors,
    formValues
  } = useEmployeeForm();
  const value = formValues[name as keyof CreateEmployee] || '';
  const fieldError = capitalizeFirstLetter(formErrors[String(name)] || '');

  return (
    <FormControl margin="normal">
      <InputLabel
        htmlFor={String(name)}>{label}</InputLabel>
      <Input
        id={String(name)}
        name={String(name)}
        type={type}
        value={value}
        onChange={handleInputChange}
      />
      {fieldError ? <FormHelperText
        error>{fieldError}</FormHelperText> : null}
    </FormControl>
  );
};

export default FormField;