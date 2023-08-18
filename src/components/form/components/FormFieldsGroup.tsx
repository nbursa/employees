import React from 'react';
import FormField from "./FormField.tsx";
import FormDatePicker from "./FormDatePicker.tsx";
import {
  EmployeeFieldGroupProps,
  FieldType
} from "../../../types";
import {formFields} from "../utils/constants.ts";

const FormFieldsGroup: React.FC<EmployeeFieldGroupProps> = () => {
  return (
    <div
      className="flex-1 flex flex-col gap-2 w-full md:w-1/2">
      {formFields.map((fieldGroup) =>
        fieldGroup.map((field: FieldType) => {
          if (field.type === "date") {
            return (
              <FormDatePicker
                key={field.name}
                label={field.label}
                name={field.name}
              />
            );
          } else {
            return (
              <FormField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
              />
            );
          }
        })
      )}
    </div>
  );
};

export default FormFieldsGroup;