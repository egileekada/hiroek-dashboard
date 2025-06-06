export const findEmptyFields = (obj: any, path = '') => {
    const emptyFields: Array<string> = [];
  
    for (const key in obj) {
      const value = obj[key];
      const currentPath = path ? `${path}.${key}` : key;
  
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        // Recurse into nested object
        emptyFields.push(...findEmptyFields(value, currentPath));
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const arrayPath = `${currentPath}[${index}]`;
          if (item === '' || item === null || item === undefined) {
            emptyFields.push(arrayPath);
          }
        });
      } else {
        if (value === '' || value === null || value === undefined || value === 0) {
          emptyFields.push(currentPath);
        }
      }
    }
  
    return emptyFields;
  }
  