/**
 * Check if the given email is valid using a regular expression.
 *
 * @param email The email address to check.
 * @returns True if the email is valid, false otherwise.
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

/**
 * Check if the given phone number is valid using a regular expression.
 *
 * @param phoneNumber The phone number to check.
 * @returns True if the phone number is valid, false otherwise.
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const phoneNumberRegex = /^\+\d{11,12}$/;
  return phoneNumberRegex.test(phoneNumber);
};

/**
 * Check if the given date string is a valid ISO date-time string.
 *
 * @param dateTime The date-time string to check.
 * @returns True if the date-time string is valid, false otherwise.
 */
export const isValidDateTime = (dateTime: string): boolean => {
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/;
  return dateTimeRegex.test(dateTime);
};

/**
 * Check if the given name is valid. A valid name should be at least 3 characters long.
 *
 * @param name The name to check.
 * @returns True if the name is valid, false otherwise.
 */
export const isValidName = (name: string): boolean => {
  return name.length >= 3;
};

/**
 * Check if the given ZIP code is valid. A valid ZIP code should be exactly 5 characters long.
 *
 * @param zip The ZIP code to check.
 * @returns True if the ZIP code is valid, false otherwise.
 */
export const isValidZIPCode = (zip: string): boolean => {
  return zip.length === 5;
};

/**
 * Check if the given address line is valid.
 *
 * @param address The address line to check.
 * @returns True if the address line is not empty, false otherwise.
 */
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
      return !isValidDateTime(fieldValue);
    case "homeAddress.city":
      return fieldValue.length === 0; // This can be refactored further if needed
    case "homeAddress.ZIPCode":
      return !isValidZIPCode(fieldValue);
    case "homeAddress.addressLine1":
      return !isValidAddressLine(fieldValue);
    default:
      return false;
  }
};