
import Papa from 'papaparse';
import { xml2js } from 'xml-js';

/**
 * Parse a JSON file
 */
export const parseJson = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (!event.target?.result) {
          reject(new Error('Failed to read file content'));
          return;
        }
        
        const content = event.target.result as string;
        const data = JSON.parse(content);
        
        // Handle different JSON structures
        if (Array.isArray(data)) {
          resolve(data);
        } else if (data && typeof data === 'object') {
          // Try to find an array in the root object
          const possibleArrays = Object.values(data).filter(val => Array.isArray(val));
          if (possibleArrays.length > 0) {
            // Use the first array found
            resolve(possibleArrays[0] as any[]);
          } else {
            // If no arrays found, wrap the object in an array
            resolve([data]);
          }
        } else {
          reject(new Error('Invalid JSON format. Expected an array or object.'));
        }
      } catch (error) {
        reject(error instanceof Error ? error : new Error('Failed to parse JSON'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Parse an XML file
 */
export const parseXml = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (!event.target?.result) {
          reject(new Error('Failed to read file content'));
          return;
        }
        
        const content = event.target.result as string;
        
        // Convert XML to JS object
        const result = xml2js(content, { compact: true, spaces: 2 });
        
        // Try to find a root element that contains employee data
        const rootElements = Object.keys(result);
        if (rootElements.length === 0) {
          reject(new Error('Invalid XML format. No root elements found.'));
          return;
        }
        
        let employeeData: any[] = [];
        
        // Common root elements for employee data
        const possibleRootNames = ['employees', 'employee', 'records', 'record', 'users', 'user', 'data', 'root'];
        
        // Try to find a suitable container for employee records
        for (const rootName of rootElements) {
          const root = result[rootName];
          
          // Check if it's an array of elements
          for (const childName of Object.keys(root)) {
            if (childName.toLowerCase().includes('employee') || possibleRootNames.includes(childName.toLowerCase())) {
              const children = root[childName];
              if (Array.isArray(children)) {
                employeeData = children.map(normalizeXmlElement);
                break;
              } else if (typeof children === 'object') {
                employeeData = [normalizeXmlElement(children)];
                break;
              }
            }
          }
          
          // If we found employee data, stop searching
          if (employeeData.length > 0) {
            break;
          }
        }
        
        if (employeeData.length === 0) {
          reject(new Error('Could not find employee data in the XML file'));
        } else {
          resolve(employeeData);
        }
      } catch (error) {
        reject(error instanceof Error ? error : new Error('Failed to parse XML'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Parse a CSV file
 */
export const parseCsv = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true, // Treat first row as headers
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV parsing error: ${results.errors[0].message}`));
        } else {
          resolve(results.data as any[]);
        }
      },
      error: (error) => {
        reject(new Error(`CSV parsing error: ${error}`));
      }
    });
  });
};

/**
 * Helper function to normalize XML elements by removing _text wrapper
 */
function normalizeXmlElement(element: any): any {
  const result: any = {};
  
  for (const key in element) {
    if (key === '_attributes') {
      // Add attributes as regular properties
      for (const attrKey in element._attributes) {
        result[attrKey] = element._attributes[attrKey];
      }
    } else if (typeof element[key] === 'object' && element[key]._text !== undefined) {
      // If it has a _text property, use that value
      result[key] = element[key]._text;
    } else if (typeof element[key] === 'object' && !Array.isArray(element[key])) {
      // Recursively normalize nested objects
      result[key] = normalizeXmlElement(element[key]);
    } else {
      // Use the value as is
      result[key] = element[key];
    }
  }
  
  return result;
}
