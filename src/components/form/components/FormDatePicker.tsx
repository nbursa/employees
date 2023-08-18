import React from 'react';
import {FormControl, FormHelperText} from "@mui/material";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import useEmployeeForm
  from '../../../hooks/useEmployeeForm.tsx';

interface EmployeeDatePickerProps {
  label: string;
  name: string;
}

const FormDatePicker: React.FC<EmployeeDatePickerProps> = ({
                                                             label,
                                                             name
                                                           }) => {
  const {
    handleInputChange,
    formValues,
    formErrors
  } = useEmployeeForm();
  const fieldValue = formValues && formValues[name] ? new Date(formValues[name]) : null;
  // console.log('fieldValue', fieldValue)
  const fieldError = formErrors[name] || '';

  return (
    <FormControl margin="normal">
      <DatePicker
        label={label}
        value={fieldValue}
        format="dd/MM/yyyy"
        onChange={(newValue) => {
          handleInputChange({
            target: {
              name,
              value: newValue ? newValue.toISOString() : null,
            },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
      />
      {fieldError ? <FormHelperText
        error>{fieldError}</FormHelperText> : null}
    </FormControl>
  );
};

export default FormDatePicker;