import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import useEmployeeForm
  from "../../hooks/useEmployeeForm.tsx";
import {
  Button,
  FormControl,
  FormGroup
} from "@mui/material";
import FormFieldsGroup
  from "./components/FormFieldsGroup.tsx";
import {capitalizeFirstLetter} from "./utils/helpers";
import FormSelect from "./components/FormSelect.tsx";
import {EmployeeFormProps} from "../../types";

const NewEmployeeForm: React.FC<EmployeeFormProps> = ({formType}) => {
  const {
    selectedEmployeeId,
    setSelectedEmployeeId,
    onSubmit
  } = useEmployeeForm();

  const employees = useSelector((state: RootState) => state.employees.employees);

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

        <FormFieldsGroup/>
      </FormGroup>

      <Button
        type="submit"
        variant="plain"
        color="primary"
      >
        {`${formType} Employee`}
      </Button>
    </form>
  );
};

export default NewEmployeeForm;