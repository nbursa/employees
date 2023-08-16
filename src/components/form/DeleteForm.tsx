import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Employee } from "../../types";
import { softDeleteEmployee } from "../../redux/actions";
import { RootState, AppDispatch } from "../../redux/store";

const DeleteForm: React.FC = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const employees = useSelector((state: RootState) => state.employees.employees);

  const handleSoftDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmployeeId) {
      dispatch(softDeleteEmployee(selectedEmployeeId));
    }
  };

  return (
    <form onSubmit={handleSoftDelete} className="mb-4 flex flex-col items-baseline gap-2">
      <h3 className="text-xl font-bold mb-2">Delete Employee</h3>

      <FormControl className="mb-4" margin="normal">
        <InputLabel className="text-sm font-medium text-gray-700">Select Employee to Soft Delete</InputLabel>
        <Select
          value={selectedEmployeeId || ''}
          onChange={e => setSelectedEmployeeId(e.target.value as string)}
          className="mt-1 p-2 border rounded-md w-full"
        >
          {employees.map((emp: Employee) => (
            <MenuItem key={emp._id} value={emp._id} className="py-2">{emp.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="secondary" className="bg-red-500 hover:bg-red-600 text-white">
        Soft Delete Employee
      </Button>
    </form>
  );
}

export default DeleteForm;