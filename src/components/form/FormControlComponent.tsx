import React from 'react';
import {FormControl, Input, InputLabel, FormHelperText} from '@mui/material';
import {CreateEmployee, Employee} from "../../types";
import {DatePicker} from '@mui/x-date-pickers';

interface FormControlProps {
  label: string;
  name: keyof CreateEmployee | keyof Employee | string;
  value: string | number | readonly string[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  type?: string;
}

const FormControlComponent: React.FC<FormControlProps> = ({
                                                            label,
                                                            name,
                                                            type = 'text',
                                                            value,
                                                            onChange,
                                                            error
                                                          }) => (
  <FormControl margin="normal">
    {type === 'date'
      ? (
        <DatePicker
          label={label}
          value={value ? new Date(value as string) : null}
          onChange={() => onChange}
        />
      )
      : (
        <>
          <InputLabel htmlFor={String(name)}>{label}</InputLabel>
          <Input
            id={String(name)}
            name={String(name)}
            type={type}
            value={value}
            onChange={onChange}
          />
        </>
      )
    }
    {error ? <FormHelperText error>{error}</FormHelperText> : null}
  </FormControl>
);

export default FormControlComponent;