export const toISODateString = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "";
  }
  return date.toISOString();
};

export const capitalizeFirstLetter = (word: string): string => {
  return word && word.charAt(0).toUpperCase() + word.slice(1);
};

export const getValueByPath = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => {
    if (acc === null || acc === undefined) {
      return undefined;
    }
    return acc[part];
  }, obj);
}

export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}