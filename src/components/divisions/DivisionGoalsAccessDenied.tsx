
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const DivisionGoalsAccessDenied = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Division Goals</h1>
        <p className="text-muted-foreground mt-2">
          Division-level strategic goals
        </p>
      </div>
      
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Access Denied</AlertTitle>
        <AlertDescription>
          You don't have permission to view division goals. Please contact HR if you believe this is an error.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DivisionGoalsAccessDenied;
