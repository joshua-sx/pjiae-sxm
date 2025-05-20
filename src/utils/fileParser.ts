
import Papa from 'papaparse';
import { xml2js } from 'xml-js';

export const parseCsv = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`Error parsing CSV: ${results.errors[0].message}`));
        } else {
          resolve(results.data);
        }
      },
      error: (error) => reject(error)
    });
  });
};

export const parseJson = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (event.target?.result) {
          const data = JSON.parse(event.target.result as string);
          // Handle both array and object formats
          const dataArray = Array.isArray(data) ? data : [data];
          resolve(dataArray);
        } else {
          reject(new Error('No data found in file'));
        }
      } catch (error) {
        reject(new Error(`Error parsing JSON: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };
    
    reader.onerror = () => reject(new Error('Error reading file'));
    
    reader.readAsText(file);
  });
};

export const parseXml = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (event.target?.result) {
          // Use xml2js with correct options
          const result = xml2js(event.target.result as string, {
            compact: true,
            ignoreComment: true,
            alwaysChildren: true
          });
          
          // Handle different XML structures
          let data: any[] = [];
          
          if (result && typeof result === 'object') {
            const rootKey = Object.keys(result)[0];
            if (rootKey) {
              const rootElement = result[rootKey];
              
              // Try to extract records assuming common XML structures
              if (rootElement.record && Array.isArray(rootElement.record)) {
                data = rootElement.record.map(transformXmlRecord);
              } else if (rootElement.employee && Array.isArray(rootElement.employee)) {
                data = rootElement.employee.map(transformXmlRecord);
              } else if (rootElement.item && Array.isArray(rootElement.item)) {
                data = rootElement.item.map(transformXmlRecord);
              } else if (Array.isArray(rootElement)) {
                data = rootElement.map(transformXmlRecord);
              } else {
                // If no recognized array structure, treat as single record
                data = [transformXmlRecord(rootElement)];
              }
            }
          }
          
          resolve(data);
        } else {
          reject(new Error('No data found in file'));
        }
      } catch (error) {
        reject(new Error(`Error parsing XML: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };
    
    reader.onerror = () => reject(new Error('Error reading file'));
    
    reader.readAsText(file);
  });
};

// Helper function to transform XML records (which typically have _text property from xml-js)
const transformXmlRecord = (record: any): Record<string, any> => {
  const result: Record<string, any> = {};
  
  if (!record || typeof record !== 'object') return result;
  
  Object.keys(record).forEach(key => {
    // Skip attributes and other special keys
    if (key === '_attributes' || key.startsWith('_')) return;
    
    // Handle simple text nodes
    if (record[key] && record[key]._text !== undefined) {
      result[key] = record[key]._text;
    } 
    // Handle more complex nodes
    else if (record[key] && typeof record[key] === 'object') {
      if (Array.isArray(record[key])) {
        result[key] = record[key].map(transformXmlRecord);
      } else {
        result[key] = transformXmlRecord(record[key]);
      }
    } else {
      result[key] = record[key];
    }
  });
  
  return result;
};
