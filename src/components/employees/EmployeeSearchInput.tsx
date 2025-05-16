
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface EmployeeSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function EmployeeSearchInput({ 
  value, 
  onChange, 
  placeholder = "Search by name, email, or employee ID...",
  className 
}: EmployeeSearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  );
}
