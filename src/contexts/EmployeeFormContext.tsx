import React, {
  createContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {
  CreateEmployee,
  ValidationErrorPayload
} from "../types";
import {toast} from "react-toastify";
import {
  errorMap
} from "../components/form/utils/validations";
import {
  defaultNewEmployee
} from "../components/form/utils/constants";
import {
  createEmployee, fetchEmployees,
  updateEmployee
} from "../redux/actions";
import {HomeAddress} from "../types";
import {
  initialFormValues
} from "../components/form/utils/constants";
import {
  debounce
} from "../components/form/utils/helpers";
import {AppDispatch} from "../redux/store";

interface EmployeeFormContextProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  errorMap: (fieldName: string, fieldValue: string) => boolean;
  getFieldError: (fieldName: string) => string | null;
  selectedEmployeeId: string | null;
  setSelectedEmployeeId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedEmployee: CreateEmployee;
  formErrors: ValidationErrorPayload;
  setFormErrors: React.Dispatch<React.SetStateAction<ValidationErrorPayload>>;
  formResult: "failure" | "success" | null;
  setFormResult: React.Dispatch<React.SetStateAction<"failure" | "success" | null>>;

}

export const EmployeeFormContext = createContext<EmployeeFormContextProps | undefined>(undefined);

export const EmployeeFormProvider: React.FC<{
  children: ReactNode
}> = ({children}) => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector((state: RootState) => state.employees.employees);

  const [formValues, setFormValues] = useState<CreateEmployee>(initialFormValues);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<CreateEmployee>(defaultNewEmployee);
  const [formErrors, setFormErrors] = useState<ValidationErrorPayload>({});
  const [formResult, setFormResult] = useState<"failure" | "success" | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let action;
    if (selectedEmployeeId) {
      action = await dispatch(updateEmployee({id: selectedEmployeeId, ...formValues}));
    } else {
      action = await dispatch(createEmployee(formValues as CreateEmployee));
    }

    if (createEmployee.fulfilled.match(action) || updateEmployee.fulfilled.match(action)) {
      setFormErrors({});
      setFormResult("success");
      toast.success("Operation successful!");
      setSelectedEmployeeId(null);
      setFormValues(initialFormValues);
      dispatch(fetchEmployees({}));
    } else if (createEmployee.rejected.match(action) || updateEmployee.rejected.match(action)) {
      if (action.payload && typeof action.payload === 'object') {
        setFormErrors(action.payload as ValidationErrorPayload);
      } else {
        console.error("Error while handling the form submission:", action.error);
        toast.error(`Error while handling the form submission: ${action.error.message}`);
      }
      setFormResult("failure");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleFormSubmit(e);
      if (formResult === "success") {
        setSelectedEmployeeId(null);
        toast.success("Employee updated successfully");
      } else if (formResult === "failure") {
        toast.error("Employee update failed");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("An unexpected error occurred while submitting the form.");
    }
  };

  const getFieldError = (fieldName: string): string | null => {
    return formErrors[fieldName] || null;
  };

  const debouncedValidation = debounce((name: string, value: string) => {
    const errorExists = errorMap(name, value);
    const errorMessage = errorExists ? formErrors[name] : null;
    setFormErrors(prevErrors => {
      return {
        ...prevErrors,
        [name]: errorMessage
      } as ValidationErrorPayload;
    });
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    if (name.includes('.')) {
      const keys = name.split('.');
      if (keys.length === 2) {
        const [key, nestedKey] = keys;
        setFormValues(prev => {
          const currentKeyVal = prev[key as keyof CreateEmployee];
          const updatedValue = (typeof currentKeyVal === 'object' && currentKeyVal !== null)
            ? {
              ...currentKeyVal,
              [nestedKey as keyof HomeAddress]: value
            }
            : {[nestedKey as keyof HomeAddress]: value};

          return {
            ...prev,
            [key]: updatedValue
          };
        });
      }
    } else {
      setFormValues(prev => ({
        ...prev,
        [name as keyof CreateEmployee]: value
      }));
    }

    debouncedValidation(name, value);
  };

  useEffect(() => {
    if (selectedEmployeeId) {
      const foundEmployee = employees.find(emp => emp._id === selectedEmployeeId);
      setSelectedEmployee(foundEmployee || defaultNewEmployee);
      if (foundEmployee) {
        setFormValues(foundEmployee);
      }
    } else {
      setSelectedEmployee(defaultNewEmployee);
      setFormValues(initialFormValues);
    }
  }, [selectedEmployeeId, employees]);

  const value = {
    handleInputChange,
    onSubmit,
    errorMap,
    getFieldError,
    selectedEmployeeId,
    setSelectedEmployeeId,
    selectedEmployee,
    formErrors,
    setFormErrors,
    formResult,
    setFormResult,
    handleFormSubmit,
    defaultNewEmployee,
    formValues,
    setFormValues,
    // setFormEmployee
  };

  return (
    <EmployeeFormContext.Provider value={value}>
      {children}
    </EmployeeFormContext.Provider>
  );
};

export default EmployeeFormProvider;