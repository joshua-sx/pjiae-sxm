
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface FieldMappingTableProps {
  detectedFields: string[];
  mappedFields: Record<string, string>;
  onMappingChange: (originalField: string, mappedField: string) => void;
  validationErrors: Record<string, string[]>;
  sampleData: any[];
}

// System field options that users can map to
const systemFields = [
  { value: 'firstName', label: 'First Name', required: true },
  { value: 'lastName', label: 'Last Name', required: true },
  { value: 'email', label: 'Email', required: true },
  { value: 'departmentId', label: 'Department ID' },
  { value: 'departmentName', label: 'Department Name' },
  { value: 'divisionId', label: 'Division ID' },
  { value: 'divisionName', label: 'Division Name' },
  { value: 'role', label: 'Role' },
  { value: 'status', label: 'Status' },
  { value: 'employeeId', label: 'Employee ID' },
  { value: 'phone', label: 'Phone Number' },
  { value: 'hireDate', label: 'Hire Date' },
  { value: 'managerId', label: 'Manager ID' },
  { value: 'managerName', label: 'Manager Name' },
];

export const FieldMappingTable = ({ 
  detectedFields, 
  mappedFields, 
  onMappingChange, 
  validationErrors,
  sampleData
}: FieldMappingTableProps) => {
  
  const getSampleValue = (field: string) => {
    if (!sampleData || sampleData.length === 0) return '';
    const value = sampleData[0][field];
    // For objects or arrays, show a simplified representation
    if (typeof value === 'object' && value !== null) {
      return Array.isArray(value) ? '[Array]' : '{Object}';
    }
    return value?.toString() || ''; 
  };
  
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Field Mapping</h3>
        <p className="text-sm text-muted-foreground">
          Map each field from your file to the appropriate field in our system
        </p>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">File Field</TableHead>
              <TableHead className="w-10">Import</TableHead>
              <TableHead className="w-1/3">Map To System Field</TableHead>
              <TableHead>Sample Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detectedFields.map((field) => {
              const hasError = !!validationErrors[mappedFields[field]]?.length;
              
              return (
                <TableRow key={field} className={hasError ? "bg-red-50" : undefined}>
                  <TableCell className="font-medium">
                    {field}
                  </TableCell>
                  <TableCell>
                    <Switch 
                      checked={!!mappedFields[field]} 
                      onCheckedChange={(checked) => {
                        onMappingChange(field, checked ? field : '');
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {mappedFields[field] && (
                      <Select 
                        value={mappedFields[field]} 
                        onValueChange={(value) => onMappingChange(field, value)}
                      >
                        <SelectTrigger className={hasError ? "border-red-500" : undefined}>
                          <SelectValue placeholder="Select a field to map to" />
                        </SelectTrigger>
                        <SelectContent>
                          {systemFields.map((systemField) => (
                            <SelectItem key={systemField.value} value={systemField.value}>
                              {systemField.label}
                              {systemField.required && <span className="text-red-500 ml-1">*</span>}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {hasError && (
                      <div className="mt-1">
                        <Badge variant="destructive">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="flex items-center">
                                <Info className="h-3 w-3 mr-1" />
                                Error
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              {validationErrors[mappedFields[field]].join(', ')}
                            </TooltipContent>
                          </Tooltip>
                        </Badge>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="truncate max-w-[200px]">
                    {getSampleValue(field)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p><span className="text-red-500">*</span> Required field</p>
      </div>
    </div>
  );
};
