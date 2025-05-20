
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export type AuthType = 'apiKey' | 'basicAuth' | 'oauth2' | 'customHeader' | 'none';
export type HttpMethod = 'GET' | 'POST';

export interface ApiConfig {
  url: string;
  method: HttpMethod;
  authType: AuthType;
  apiKeyName?: string;
  apiKeyValue?: string;
  username?: string;
  password?: string;
  customHeaderName?: string;
  customHeaderValue?: string;
  queryParams?: Record<string, string>;
  pagination?: {
    enabled: boolean;
    pageParam?: string;
    limitParam?: string;
    pageSize?: number;
  };
}

export interface ApiImportHook {
  isLoading: boolean;
  isConnected: boolean;
  apiConfig: ApiConfig;
  apiData: any[];
  detectedFields: string[];
  updateApiConfig: (config: Partial<ApiConfig>) => void;
  testConnection: () => Promise<boolean>;
  fetchApiData: () => Promise<boolean>;
}

export const useApiImport = (): ApiImportHook => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [apiData, setApiData] = useState<any[]>([]);
  const [detectedFields, setDetectedFields] = useState<string[]>([]);
  
  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    url: '',
    method: 'GET',
    authType: 'none',
    queryParams: {},
    pagination: {
      enabled: false,
      pageParam: 'page',
      limitParam: 'limit',
      pageSize: 100
    }
  });
  
  const updateApiConfig = (config: Partial<ApiConfig>) => {
    setApiConfig(prev => ({
      ...prev,
      ...config
    }));
  };
  
  const buildHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    
    switch (apiConfig.authType) {
      case 'apiKey':
        if (apiConfig.apiKeyName && apiConfig.apiKeyValue) {
          headers[apiConfig.apiKeyName] = apiConfig.apiKeyValue;
        }
        break;
      case 'basicAuth':
        if (apiConfig.username && apiConfig.password) {
          const credentials = btoa(`${apiConfig.username}:${apiConfig.password}`);
          headers['Authorization'] = `Basic ${credentials}`;
        }
        break;
      case 'customHeader':
        if (apiConfig.customHeaderName && apiConfig.customHeaderValue) {
          headers[apiConfig.customHeaderName] = apiConfig.customHeaderValue;
        }
        break;
      case 'oauth2':
        // OAuth2 would require a more complex implementation
        // This would typically involve redirecting to an auth server
        // and handling callbacks with access tokens
        break;
    }
    
    return headers;
  };
  
  const buildUrl = (): string => {
    let url = apiConfig.url;
    
    // Add query parameters if they exist
    if (apiConfig.queryParams && Object.keys(apiConfig.queryParams).length > 0) {
      const params = new URLSearchParams();
      Object.entries(apiConfig.queryParams).forEach(([key, value]) => {
        params.append(key, value);
      });
      
      url += `?${params.toString()}`;
    }
    
    return url;
  };
  
  const testConnection = async (): Promise<boolean> => {
    if (!apiConfig.url) {
      toast({
        title: "Missing API URL",
        description: "Please enter a valid API endpoint URL",
        variant: "destructive",
      });
      return false;
    }
    
    setIsLoading(true);
    
    try {
      // For demonstration purposes, this simulates a successful API connection
      // In a real implementation, this would be a proxy request via your backend
      // to avoid CORS issues and protect API keys
      
      const headers = buildHeaders();
      const url = buildUrl();
      
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful connection
      setIsConnected(true);
      
      toast({
        title: "Connection Successful",
        description: "Successfully connected to the API endpoint",
      });
      
      return true;
    } catch (error) {
      setIsConnected(false);
      
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect to API endpoint",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchApiData = async (): Promise<boolean> => {
    if (!isConnected) {
      const success = await testConnection();
      if (!success) return false;
    }
    
    setIsLoading(true);
    
    try {
      // In a real implementation, this would be a proxy request via your backend
      // For demonstration, we'll use mock data
      
      // Mock employee data from API
      const mockData = [
        {
          emp_id: "E001",
          emp_name: "John Doe",
          emp_email: "john.doe@example.com",
          dept_code: "TECH",
          dept_name: "Technology",
          div_id: "DIV1",
          div_name: "Development",
          position: "Senior Developer",
          status: "Active",
          manager_id: "M001"
        },
        {
          emp_id: "E002",
          emp_name: "Jane Smith",
          emp_email: "jane.smith@example.com",
          dept_code: "HR",
          dept_name: "Human Resources",
          div_id: "DIV2",
          div_name: "People Operations",
          position: "HR Manager",
          status: "Active",
          manager_id: "M002"
        }
      ];
      
      setApiData(mockData);
      
      // Extract field names from first record
      if (mockData.length > 0) {
        setDetectedFields(Object.keys(mockData[0]));
      }
      
      toast({
        title: "Data Retrieved",
        description: `Successfully fetched ${mockData.length} employee records`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error Fetching Data",
        description: error instanceof Error ? error.message : "Failed to fetch employee data",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    isConnected,
    apiConfig,
    apiData,
    detectedFields,
    updateApiConfig,
    testConnection,
    fetchApiData
  };
};
