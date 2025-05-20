
import * as Papa from 'papaparse';
import { xml2js } from 'xml-js';

/**
 * Parse a CSV file into a JSON array
 */
export const parseCsv = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        if (results.errors && results.errors.length > 0) {
          reject(new Error(`CSV parsing error: ${results.errors[0].message}`));
        } else {
          resolve(results.data as any[]);
        }
      },
      error: (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      }
    });
  });
};

/**
 * Parse a JSON file into a JSON array
 */
export const parseJson = async (file: File): Promise<any[]> => {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    
    // Handle both array and object responses
    if (Array.isArray(data)) {
      return data;
    } else if (typeof data === 'object' && data !== null) {
      // If it's a single object, wrap it in an array
      if (Object.keys(data).length > 0) {
        return [data];
      }
      // If it has a data property that's an array, use that
      if (data.data && Array.isArray(data.data)) {
        return data.data;
      }
      // If it has a employees/users/items property that's an array, use that
      for (const key of ['employees', 'users', 'items', 'records']) {
        if (data[key] && Array.isArray(data[key])) {
          return data[key];
        }
      }
    }
    throw new Error('Invalid JSON structure. Expected an array of employee objects.');
  } catch (error) {
    throw new Error(`JSON parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Parse an XML file into a JSON array
 */
export const parseXml = async (file: File): Promise<any[]> => {
  try {
    const text = await file.text();
    const options = { 
      compact: true, 
      trim: true,
      nativeType: true,
      ignoreDeclaration: true,
      ignoreComment: true,
      ignoreDoctype: true
    };
    
    const result = xml2js(text, options);
    
    // Transform XML structure into a flat array of objects
    const transformXmlToArray = (xmlObj: any): any[] => {
      // Common XML structures for employee data
      if (xmlObj.employees && xmlObj.employees.employee) {
        return Array.isArray(xmlObj.employees.employee) 
          ? xmlObj.employees.employee.map(flattenXmlObject)
          : [flattenXmlObject(xmlObj.employees.employee)];
      }
      
      if (xmlObj.data && xmlObj.data.record) {
        return Array.isArray(xmlObj.data.record)
          ? xmlObj.data.record.map(flattenXmlObject)
          : [flattenXmlObject(xmlObj.data.record)];
      }
      
      if (xmlObj.root && xmlObj.root.item) {
        return Array.isArray(xmlObj.root.item)
          ? xmlObj.root.item.map(flattenXmlObject)
          : [flattenXmlObject(xmlObj.root.item)];
      }
      
      // If we can't find a common structure, try to extract any array we can find
      for (const key in xmlObj) {
        const value = xmlObj[key];
        if (typeof value === 'object') {
          for (const subKey in value) {
            if (Array.isArray(value[subKey])) {
              return value[subKey].map(flattenXmlObject);
            } else if (typeof value[subKey] === 'object') {
              return [flattenXmlObject(value[subKey])];
            }
          }
        }
      }
      
      return [flattenXmlObject(xmlObj)];
    };
    
    // Helper to flatten XML objects with _text properties
    const flattenXmlObject = (obj: any): any => {
      const result: Record<string, any> = {};
      
      const processObj = (currentObj: any, target: Record<string, any>) => {
        for (const key in currentObj) {
          if (key === '_text' || key === '_cdata') {
            return currentObj[key];
          }
          
          const value = currentObj[key];
          
          if (typeof value === 'object' && value !== null) {
            if (value._text !== undefined) {
              target[key] = value._text;
            } else if (value._cdata !== undefined) {
              target[key] = value._cdata;
            } else {
              target[key] = processObj(value, {});
            }
          } else {
            target[key] = value;
          }
        }
        return target;
      };
      
      return processObj(obj, result);
    };
    
    return transformXmlToArray(result);
  } catch (error) {
    throw new Error(`XML parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
