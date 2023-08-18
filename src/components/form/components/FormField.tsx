import useEmployeeForm
  from "../../../hooks/useEmployeeForm.tsx";
import {
  capitalizeFirstLetter,
  getValueByPath
} from "../utils/helpers.ts";
import {useEffect} from "react";
import {
  FormControl, FormHelperText,
  Input,
  InputLabel
} from "@mui/material";
import {errorMap} from "../utils/validations.ts";

const FormField: React.FC<FormControlProps> = ({
                                                 label,
                                                 name,
                                                 type = 'text'
                                               }) => {
  const {
    handleInputChange,
    formErrors,
    setFormErrors,
    formValues
  } = useEmployeeForm();

  const value = formValues && getValueByPath(formValues, String(name)) || '';
  const fieldError = capitalizeFirstLetter(formErrors[String(name)] || '');

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);

    const errorExists = errorMap(e.target.name, e.target.value);
    const errorMessage = errorExists ? formErrors[e.target.name] : null;
    const keys = e.target.name.split('.');
    if (keys.length === 1) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [e.target.name]: errorMessage
      }));
    } else if (keys.length === 2) {
      const [key, nestedKey] = keys;
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [key]: {
          ...prevErrors[key],
          [nestedKey]: errorMessage || null
        }
      }));
    }
  };

  // useEffect(() => {
  //   handleValidation(name, value);
  // }, [value]);

  return (
    <FormControl margin="normal">
      <InputLabel
        htmlFor={String(name)}>{label}</InputLabel>
      <Input
        id={String(name)}
        name={String(name)}
        type={type}
        value={value}
        onChange={handleValidation}
      />
      {fieldError ? <FormHelperText
        error>{fieldError}</FormHelperText> : null}
    </FormControl>
  );
};

export default FormField;