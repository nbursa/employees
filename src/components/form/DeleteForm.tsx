import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  Autocomplete,
  Button,
  FormControl,
  TextField
} from "@mui/material";
import {Employee} from "../../types";
import {softDeleteEmployee} from "../../redux/actions";
import {RootState, AppDispatch} from "../../redux/store";
import {toast} from "react-toastify";
import {useTheme} from "@mui/material/styles";

const DeleteForm: React.FC = () => {
  const theme = useTheme();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );
  const dispatch = useDispatch<AppDispatch>();

  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  const handleSoftDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmployeeId) {
      try {
        await dispatch(softDeleteEmployee(selectedEmployeeId));
        toast.success('Employee deleted successfully');
        setSelectedEmployeeId(null);
      } catch (error) {
        toast.error('Failed to delete the employee');
      }
    } else {
      toast.warn('Please select an employee to delete');
    }
  };

  return (
    <form
      onSubmit={handleSoftDelete}
      className="mb-4 py-8 flex flex-col items-baseline gap-2"
    >
      <h3 className="text-xl font-bold mb-2">Delete
        Employee</h3>

      <FormControl className="w-full md:w-1/2"
                   margin="normal">
        <Autocomplete
          className="mb-6"
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
      </FormControl>
      <Button
        type="submit"
        sx={{
          backgroundColor: `${theme.palette.grey[200]}`,
          padding: '.75rem 1.25rem',
          color: `${theme.palette.grey[700]}`,
          '&:hover': {
            backgroundColor: `${theme.palette.grey[300]}`,
          },
        }}
      >
        Soft Delete Employee
      </Button>
    </form>
  );
};

export default DeleteForm;