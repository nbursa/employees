/**
 * Convert a given date string to its corresponding ISO date string representation.
 *
 * @param dateString The date string to convert.
 * @returns The ISO date string representation of the input date string, or an empty string if invalid.
 */
export const toISODateString = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "";
  }
  return date.toISOString();
};

/**
 * Capitalize the first letter of the given word.
 *
 * @param word The word to capitalize.
 * @returns The word with its first letter capitalized.
 */
export const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

/**
 * Retrieve a nested value from an object using a dot-separated path.
 *
 * @param obj The object to retrieve the value from.
 * @param path The dot-separated path to the value.
 * @returns The retrieved value.
 */
export const getValueByPath = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * Set a nested value in an object using a dot-separated path.
 *
 * @param obj The object to set the value in.
 * @param path The dot-separated path to where the value should be set.
 * @param value The value to set.
 */
export const setValueByPath = (obj: any, path: string, value: any): void => {
  const parts = path.split('.');
  const lastPart = parts.pop();
  const target = parts.reduce((acc, part) => acc[part] = acc[part] || {}, obj);
  target[lastPart] = value;
}