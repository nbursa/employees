import React, {useEffect} from 'react';
import {
  Button, FormControl, Input, InputLabel, FormGroup, TextField, Select, MenuItem,
} from '@mui/material';
import {CreateEmployee, Employee} from "../../types";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";

interface EmployeeFormProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  formType: 'create' | 'update';
  selectedEmployeeId: string | null;
  setSelectedEmployeeId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedEmployee: CreateEmployee;
  setFormEmployee: React.Dispatch<React.SetStateAction<CreateEmployee>>;
}

const defaultNewEmployee: Employee = {
  _id: '',
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

const EmployeeForm: React.FC<EmployeeFormProps> = ({ formType = 'create', handleInputChange, handleFormSubmit, selectedEmployeeId, setSelectedEmployeeId, selectedEmployee, setFormEmployee }) => {
  // const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const employees = useSelector((state: RootState) => state.employees.employees);
  // const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // const employee = (formType === 'update' && selectedEmployee) ? selectedEmployee : defaultNewEmployee;

  useEffect(() => {
    if (selectedEmployeeId && employees) {
      const foundEmployee = employees.find(emp => emp._id === selectedEmployeeId);
      setFormEmployee(foundEmployee || defaultNewEmployee);
    }
  }, [selectedEmployeeId, employees, setFormEmployee]);


  return (
  <form onSubmit={handleFormSubmit} className="mb-4 flex flex-col items-baseline gap-2">
    <h3 className="text-xl font-bold mb-2">{formType} Employee</h3>

    {formType === 'update' && (
      <FormControl className="mb-4" margin="normal">
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



    <FormGroup className="container mx-auto px-4 flex flex-col">
      {/* Basic Information */}
      <FormControl margin="normal">
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          id="name"
          name="name"
          value={selectedEmployee.name}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl margin="normal">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          name="email"
          value={selectedEmployee.email}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl margin="normal">
        <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={selectedEmployee.phoneNumber}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl margin="normal">
        <InputLabel htmlFor="dateOfEmployment">Date of Employment</InputLabel>
        <TextField
          id="dateOfEmployment"
          name="dateOfEmployment"
          type="date"
          value={selectedEmployee.dateOfEmployment}
          onChange={handleInputChange}
          InputLabelProps={{shrink: true}}
        />
      </FormControl>

      <FormControl margin="normal">
        <InputLabel htmlFor="dateOfBirth">Date of Birth</InputLabel>
        <TextField
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={selectedEmployee.dateOfBirth}
          onChange={handleInputChange}
          InputLabelProps={{shrink: true}}
        />
      </FormControl>

      {/* Home Address */}
      <h4 className="text-lg font-medium mb-2 mt-4">Home Address</h4>
      <FormControl margin="normal">
        <InputLabel htmlFor="city">City</InputLabel>
        <Input
          id="city"
          name="homeAddress.city"
          value={selectedEmployee.homeAddress.city}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl margin="normal">
        <InputLabel htmlFor="ZIPCode">ZIP Code</InputLabel>
        <Input
          id="ZIPCode"
          name="homeAddress.ZIPCode"
          value={selectedEmployee.homeAddress.ZIPCode}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl margin="normal">
        <InputLabel htmlFor="addressLine1">Address Line 1</InputLabel>
        <Input
          id="addressLine1"
          name="homeAddress.addressLine1"
          value={selectedEmployee.homeAddress.addressLine1}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl margin="normal">
        <InputLabel htmlFor="addressLine2">Address Line 2</InputLabel>
        <Input
          id="addressLine2"
          name="homeAddress.addressLine2"
          value={selectedEmployee.homeAddress.addressLine2}
          onChange={handleInputChange}
        />
      </FormControl>

    </FormGroup>

    <Button type="submit" variant="contained" color="primary">
      {`${formType} Employee`}
    </Button>

    </form>
  );
}

export default EmployeeForm;