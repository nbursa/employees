import React, {useEffect} from "react";
import {
  Button,
  FormControl,
  FormGroup,
  Autocomplete,
  TextField,
} from "@mui/material";
import {
  CreateEmployee,
  Employee,
  ValidationErrorPayload
} from "../../types";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import FormControlComponent from "./FormControlComponent";
import {toast} from "react-toastify";
import {DatePicker} from "@mui/x-date-pickers";

interface EmployeeFormProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent) => Promise<void>;
  formType: "create" | "update";
  selectedEmployeeId: string | null;
  setSelectedEmployeeId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedEmployee: CreateEmployee;
  setFormEmployee: React.Dispatch<React.SetStateAction<CreateEmployee>>;
  formErrors: ValidationErrorPayload;
  formResult: "failure" | "success" | null;
}

const defaultNewEmployee: CreateEmployee = {
  name: "",
  email: "",
  phoneNumber: "",
  dateOfEmployment: new Date().toISOString().substring(0, 10),
  dateOfBirth: new Date().toISOString().substring(0, 10),
  homeAddress: {
    city: "",
    ZIPCode: "",
    addressLine1: "",
    addressLine2: "",
  },
  isDeleted: false,
  deletedAt: null,
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({
                                                     formType,
                                                     handleInputChange,
                                                     handleFormSubmit,
                                                     selectedEmployeeId,
                                                     setSelectedEmployeeId,
                                                     selectedEmployee,
                                                     setFormEmployee,
                                                     formErrors,
                                                     formResult,
                                                   }) => {
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  const getFieldError = (fieldName: string): string | null => {
    return formErrors[fieldName] || null;
  };

  const errorMap = (fieldName: string, fieldValue: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneNumberRegex = /^\+\d{11,12}$/;
    const dateTimeRegex =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/;

    switch (fieldName) {
      case "name":
        return fieldValue.length < 3;
      case "email":
        return !emailRegex.test(fieldValue);
      case "phoneNumber":
        return !phoneNumberRegex.test(fieldValue);
      case "dateOfEmployment":
        return !dateTimeRegex.test(fieldValue);
      case "dateOfBirth":
        return !dateTimeRegex.test(fieldValue);
      case "homeAddress.city":
        return fieldValue.length === 0;
      case "homeAddress.ZIPCode":
        return fieldValue.length !== 5;
      case "homeAddress.addressLine1":
        return fieldValue.length > 0;
      default:
        return false;
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleFormSubmit(e).then(() => {
      if (formResult === "success") {
        setSelectedEmployeeId(null);
        toast.success(
          formType === "create"
            ? "Employee created successfully"
            : "Employee updated successfully"
        );
      } else if (formResult === "failure") {
        const errorMessage =
          formType === "create"
            ? "Employee creation failed"
            : "Employee update failed";

        toast.error(errorMessage);
      }
    })
  };

  const toISODateString = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }
    return date.toISOString();
  };

  const formFields = [
    [{
      label: "Name",
      name: "name",
      type: "text",
      value: selectedEmployee.name
    },
      {
        label: "Email",
        name: "email",
        type: "text",
        value: selectedEmployee.email,
      },
      {
        label: "Phone Number",
        name: "phoneNumber",
        type: "text",
        value: selectedEmployee.phoneNumber,
      },
      {
        label: "Date of Employment",
        name: "dateOfEmployment",
        type: "date",
        value: toISODateString(selectedEmployee.dateOfEmployment),
      },
      {
        label: "Date of Birth",
        name: "dateOfBirth",
        type: "date",
        value: toISODateString(selectedEmployee.dateOfBirth),
      }],
    [{
      label: "City",
      name: "homeAddress.city",
      type: "text",
      value: selectedEmployee.homeAddress.city,
    },
      {
        label: "ZIP Code",
        name: "homeAddress.ZIPCode",
        type: "text",
        value: selectedEmployee.homeAddress.ZIPCode,
      },
      {
        label: "Address Line 1",
        name: "homeAddress.addressLine1",
        type: "text",
        value: selectedEmployee.homeAddress.addressLine1,
      },
      {
        label: "Address Line 2",
        name: "homeAddress.addressLine2",
        type: "text",
        value: selectedEmployee.homeAddress.addressLine2,
      }],
  ];

  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  useEffect(() => {
    if (selectedEmployeeId) {
      const foundEmployee = employees.find(
        (emp) => emp._id === selectedEmployeeId
      );
      setFormEmployee(foundEmployee || defaultNewEmployee);
    } else {
      setFormEmployee(defaultNewEmployee);
    }
  }, [selectedEmployeeId, employees, setFormEmployee]);

  return (
    <form
      onSubmit={onSubmit}
      className="py-8 items-baseline gap-2"
    >
      <h3 className="text-xl font-bold mb-2">
        {capitalizeFirstLetter(formType)} Employee
      </h3>

      <FormGroup
        className="container mx-auto flex gap-2 mb-6 flex-col md:flex-row">
        {formType === "update" && (
          <FormControl className="mb-4 w-full md:w-1/2"
                       margin="normal">
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
                <TextField {...params}
                           label="Select employee"/>
              )}
            />
          </FormControl>
        )}
        <div
          className="flex w-full gap-4 flex-col md:flex-row">
          {formFields.map((fieldGroup, idx) => (
            <div key={idx}
                 className="flex-1 flex flex-col gap-2 w-full md:w-1/2">
              {fieldGroup.map((field) => {
                if (field.type === "date") {
                  return (
                    <FormControl
                      key={`${field.name}-control`}
                      margin="normal">
                      <DatePicker
                        label={field.label}
                        value={field.value ? new Date(field.value) : null}
                        onChange={(newValue) => {
                          if (newValue) {
                            handleInputChange({
                              target: {
                                name: field.name,
                                value: newValue.toISOString(),
                              },
                            } as React.ChangeEvent<HTMLInputElement>);
                          }
                        }}
                      />
                    </FormControl>
                  );
                } else {
                  return (
                    <FormControlComponent
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      type={field.type}
                      value={field.value}
                      onChange={handleInputChange}
                      error={
                        errorMap(field.name, field.value) ? getFieldError(field.name) : null
                      }
                    />
                  );
                }
              })}
            </div>
          ))}
        </div>
      </FormGroup>

      <Button type="submit" variant="contained"
              color="primary">
        {`${formType} Employee`}
      </Button>
    </form>
  );
};

export default EmployeeForm;