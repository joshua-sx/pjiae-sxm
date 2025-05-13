
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileSpreadsheetIcon } from 'lucide-react';

interface ReportControlsProps {
  timeframe: string;
  setTimeframe: (value: string) => void;
  department: string;
  setDepartment: (value: string) => void;
}

export const ReportControls: React.FC<ReportControlsProps> = ({ 
  timeframe, 
  setTimeframe, 
  department, 
  setDepartment 
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
      <Select value={timeframe} onValueChange={setTimeframe}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select timeframe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="quarterly">Quarterly</SelectItem>
          <SelectItem value="yearly">Yearly</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={department} onValueChange={setDepartment}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          <SelectItem value="operations">Operations</SelectItem>
          <SelectItem value="finance">Finance</SelectItem>
          <SelectItem value="hr">Human Resources</SelectItem>
          <SelectItem value="it">IT</SelectItem>
          <SelectItem value="sales">Sales</SelectItem>
          <SelectItem value="marketing">Marketing</SelectItem>
        </SelectContent>
      </Select>
      
      <Button variant="outline" className="gap-2 w-full sm:w-auto">
        <FileSpreadsheetIcon size={18} />
        Export to Excel
      </Button>
    </div>
  );
};
