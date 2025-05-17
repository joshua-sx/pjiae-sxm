
import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ id, label, error, hint, required = false, className, children }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        <Label 
          htmlFor={id}
          className={cn(
            error && "text-destructive",
            required && "after:content-['*'] after:ml-0.5 after:text-destructive"
          )}
        >
          {label}
        </Label>
        
        {children}
        
        {hint && !error && (
          <p className="text-sm text-muted-foreground">{hint}</p>
        )}
        
        {error && (
          <p className="text-sm text-destructive font-medium">{error}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
