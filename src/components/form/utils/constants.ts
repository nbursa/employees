import {CreateEmployee, FieldType} from "../../../types";

export const defaultNewEmployee: CreateEmployee = {
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

export const initialFormValues = {
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
};

export const formFields: FieldType[][] = [
  [{
    label: "Name",
    name: "name",
    type: "text",
    value: "",
  },
    {
      label: "Email",
      name: "email",
      type: "text",
      value: "",
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      type: "text",
      value: "",
    },
    {
      label: "Date of Employment",
      name: "dateOfEmployment",
      type: "date",
      value: "",
    },
    {
      label: "Date of Birth",
      name: "dateOfBirth",
      type: "date",
      value: "",
    }],
  [{
    label: "City",
    name: "homeAddress.city",
    type: "text",
    value: "",
  },
    {
      label: "ZIP Code",
      name: "homeAddress.ZIPCode",
      type: "text",
      value: "",
    },
    {
      label: "Address Line 1",
      name: "homeAddress.addressLine1",
      type: "text",
      value: "",
    },
    {
      label: "Address Line 2",
      name: "homeAddress.addressLine2",
      type: "text",
      value: "",
    }],
];