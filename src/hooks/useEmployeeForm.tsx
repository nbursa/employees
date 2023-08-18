import {useContext} from "react";
import {
  EmployeeFormContext
} from "../contexts/EmployeeFormContext.tsx";

const useEmployeeForm = () => {
  const context = useContext(EmployeeFormContext);
  if (!context) {
    throw new Error('useEmployeeForm must be used within an EmployeeFormProvider');
  }
  return context;
};

export default useEmployeeForm;