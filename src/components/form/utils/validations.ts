export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const phoneNumberRegex = /^\+\d{11,12}$/;
  return phoneNumberRegex.test(phoneNumber);
};

export const isValidName = (name: string): boolean => {
  return name.length >= 2;
};

export const isValidZIPCode = (zip: string): boolean => {
  return zip.length === 5;
};

export const isValidZIPCodeNumber = (zip: string): boolean => {
  const parsedNumber = parseInt(zip, 10);
  return !isNaN(parsedNumber);
};

export const isValidCity = (city: string): boolean => {
  return city.length > 0;
};

export const isValidAddressLine = (address: string): boolean => {
  return address.length > 0;
};

export const errorMap = (fieldName: string, fieldValue: string): boolean => {
  switch (fieldName) {
    case "name":
      return !isValidName(fieldValue);
    case "email":
      return !isValidEmail(fieldValue);
    case "phoneNumber":
      return !isValidPhoneNumber(fieldValue);
    case "dateOfEmployment":
    case "dateOfBirth":
    case "homeAddress.city":
      return isValidCity(fieldValue);
    case "homeAddress.ZIPCode":
      return !isValidZIPCode(fieldValue);
    case "homeAddress.Invalid":
      return !isValidZIPCodeNumber(fieldValue);
    case "homeAddress.addressLine1":
      return !isValidAddressLine(fieldValue);
    default:
      return false;
  }
};