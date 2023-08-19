import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import useEmployeeForm
  from "../../hooks/useEmployeeForm.tsx";
import {
  FormControl,
  FormGroup
} from "@mui/material";
import FormFieldsGroup
  from "./components/FormFieldsGroup.tsx";
import {capitalizeFirstLetter} from "./utils/helpers";
import FormSelect from "./components/FormSelect.tsx";
import {EmployeeFormProps} from "../../types";
import CustomButton from "../CustomButton.tsx";
// import {useTheme} from "@mui/material/styles";

const EmployeeForm: React.FC<EmployeeFormProps> = ({formType}) => {
  // const theme = useTheme();
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

      <CustomButton
        type="submit"
        label={`${formType} Employee`}
        sx={{
          backgroundColor: theme => theme.palette.grey[200],
          padding: '.75rem 1.25rem',
          color: theme => theme.palette.grey[700],
          '&:hover': {
            backgroundColor: theme => theme.palette.grey[300],
          },
        }}
      />

      {/*<Button*/}
      {/*  type="submit"*/}
      {/*  sx={{*/}
      {/*    backgroundColor: theme => theme.palette.grey[200],*/}
      {/*    padding: '.75rem 1.25rem',*/}
      {/*    color: theme => theme.palette.grey[700],*/}
      {/*    '&:hover': {*/}
      {/*      backgroundColor: theme => theme.palette.grey[300],*/}
      {/*    },*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {`${formType} Employee`}*/}
      {/*</Button>*/}
    </form>
  );
};

export default EmployeeForm;