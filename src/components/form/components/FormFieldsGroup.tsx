import React from 'react';
import FormField from "./FormField.tsx";
import FormDatePicker from "./FormDatePicker.tsx";
import {
  FieldType
} from "../../../types";
import {formFields} from "../utils/constants.ts";

const FormFieldsGroup: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-2 w-full">
      {formFields.map((fieldGroup, idx) => (
        <div key={idx}
             className="flex-1 flex flex-col gap-2 w-full md:w-1/2">
          {fieldGroup.map((field: FieldType) => {
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
          })}
        </div>
      ))}
    </div>
  );
};


export default FormFieldsGroup;