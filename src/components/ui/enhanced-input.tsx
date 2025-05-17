
import React from "react";
import { Input } from "@/components/ui/input";
import { FormField, FormFieldProps } from "@/components/ui/form-field";
import { cn } from "@/lib/utils";

export interface EnhancedInputProps extends 
  Omit<FormFieldProps, "children">,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "className"> {
  status?: "default" | "error" | "success";
  icon?: React.ReactNode;
}

export const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ id, label, error, hint, required, className, status = "default", icon, ...props }, ref) => {
    const inputStyles = cn(
      "w-full",
      icon && "pl-9",
      status === "error" && "border-destructive focus-visible:ring-destructive",
      status === "success" && "border-success focus-visible:ring-success",
    );

    return (
      <FormField
        id={id}
        label={label}
        error={error}
        hint={hint}
        required={required}
        className={className}
      >
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <Input
            id={id}
            ref={ref}
            className={inputStyles}
            aria-invalid={!!error}
            {...props}
          />
        </div>
      </FormField>
    );
  }
);

EnhancedInput.displayName = "EnhancedInput";
