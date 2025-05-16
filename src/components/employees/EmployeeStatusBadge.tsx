
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { EmployeeStatus } from '@/types/employee';

interface EmployeeStatusBadgeProps {
  status: EmployeeStatus;
  className?: string;
}

export default function EmployeeStatusBadge({ 
  status, 
  className 
}: EmployeeStatusBadgeProps) {
  let variant: "default" | "outline" | "secondary" | "destructive" = "default";
  
  switch (status) {
    case 'Active':
      variant = "default"; // Using the primary color
      break;
    case 'Inactive':
      variant = "destructive"; // Using a destructive style
      break;
    case 'On Leave':
      variant = "secondary"; // Using a secondary style
      break;
    default:
      variant = "default";
  }
  
  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  );
}
