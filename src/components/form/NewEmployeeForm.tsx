import React, {useEffect} from "react";
import {
  Button,
  FormControl,
  FormGroup,
} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {toast} from "react-toastify";
import FormFieldsGroup
  from "./components/FormFieldsGroup.tsx";
import {capitalizeFirstLetter} from "./utils/helpers";
import {defaultNewEmployee} from "./utils/constants";
import {EmployeeFormProps} from "../../types";
import FormSelect from "./components/FormSelect.tsx";
import {
  useEmployeeForm
} from '../../contexts/EmployeeFormContext';

const NewEmployeeForm: React.FC<EmployeeFormProps> = ({
                                                        formType,
                                                        handleFormSubmit: handleFormSubmitProp,
                                                      }) => {
  const {
    handleInputChange,
    selectedEmployeeId,
    setSelectedEmployeeId,
    // formEmployee,
    setFormEmployee,
    // formErrors,
    formResult
  } = useEmployeeForm();

  const employees = useSelector((state: RootState) => state.employees.employees);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleFormSubmitProp(e).then(() => {
        if (formResult === "success") {
          setSelectedEmployeeId(null);
          toast.success(
            formType === "create"
              ? "Employee created successfully"
              : "Employee updated successfully"
          );
        } else if (formResult === "failure") {
          toast.error(
            formType === "create"
              ? "Employee creation failed"
              : "Employee update failed"
          );
        }
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("An unexpected error occurred while submitting the form.");
    }
  };

  useEffect(() => {
    if (selectedEmployeeId) {
      const foundEmployee = employees.find((emp) => emp._id === selectedEmployeeId);
      setFormEmployee(foundEmployee || defaultNewEmployee);
    } else {
      setFormEmployee(defaultNewEmployee);
    }
  }, [selectedEmployeeId, employees, setFormEmployee]);

  return (
    <form onSubmit={onSubmit}
          className="py-8 items-baseline gap-2">
      <h3
        className="text-xl font-bold mb-2">{capitalizeFirstLetter(formType)} Employee</h3>

      <FormGroup
        className="container mx-auto flex gap-2 mb-6 flex-col md:flex-row">
        {formType === "update" && (
          <FormControl className="mb-4 w-full md:w-1/2"
                       margin="normal">
            <FormSelect
              employees={employees}
              selectedEmployeeId={selectedEmployeeId}
              setSelectedEmployeeId={setSelectedEmployeeId}
            />
          </FormControl>
        )}

        <FormFieldsGroup
          handleInputChange={handleInputChange}/>
      </FormGroup>

      <Button type="submit" variant="contained"
              color="primary">
        {`${formType} Employee`}
      </Button>
    </form>
  );
};

export default NewEmployeeForm;