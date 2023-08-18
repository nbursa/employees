import React from 'react';
import {
  Autocomplete,
  FormHelperText,
  TextField
} from "@mui/material";
import {Employee} from "../../../types";
import {useSelector} from "react-redux";

interface EmployeeAutocompleteProps {
  employees: Employee[];
  selectedEmployeeId: string | null;
  setSelectedEmployeeId: (id: string | null) => void;
}

const FormSelect: React.FC<EmployeeAutocompleteProps> = ({
                                                           employees,
                                                           selectedEmployeeId,
                                                           setSelectedEmployeeId
                                                         }) => {

  return (
    <>
      <Autocomplete
        disablePortal
        id="employee-autocomplete"
        options={employees}
        noOptionsText="No employees found"
        getOptionLabel={(employee) => employee.name}
        value={
          selectedEmployeeId
            ? employees.find((emp) => emp._id === selectedEmployeeId)
            : null
        }
        onChange={(_, newValue: Employee | null) => {
          setSelectedEmployeeId(newValue ? newValue._id : null);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Select employee"/>
        )}
      />
    </>
  );
}

export default FormSelect;