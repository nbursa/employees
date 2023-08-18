import React, {
  createContext,
  useContext,
  ReactNode,
  useState
} from 'react';
import {
  getValueByPath,
  setValueByPath
} from '../components/form/utils/helpers';
import {useDispatch, useSelector} from "react-redux";

interface EmployeeFormContextProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formErrors: ValidationErrorPayload;
  selectedEmployeeId: string | null;
  setSelectedEmployeeId: (id: string | null) => void;
  formEmployee: CreateEmployee;
  setFormEmployee: React.Dispatch<React.SetStateAction<CreateEmployee>>;
  setFormErrors: React.Dispatch<React.SetStateAction<ValidationErrorPayload>>;
  formResult: 'failure' | 'success' | null;
  setFormResult: React.Dispatch<React.SetStateAction<'failure' | 'success' | null>>;
}

const EmployeeFormContext = createContext<EmployeeFormContextProps | undefined>(undefined);

export const useEmployeeForm = (): EmployeeFormContextProps => {
  const context = useContext(EmployeeFormContext);
  if (!context) {
    throw new Error('useEmployeeForm must be used within an EmployeeFormProvider');
  }
  return context;
};

export const EmployeeFormProvider: React.FC<{
  children: ReactNode
}> = ({children}) => {
  const formValues = useSelector(selectFormValues);
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    dispatch(updateFormValue({name, value}));
  };

  return (
    <EmployeeFormContext.Provider value={{
      handleInputChange,
      selectedEmployeeId,
      setSelectedEmployeeId,
      errors,
      setErrors,
      formValues,
    }}>
      {children}
    </EmployeeFormContext.Provider>
  );
};