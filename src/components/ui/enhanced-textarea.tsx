
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormFieldProps } from "@/components/ui/form-field";
import { cn } from "@/lib/utils";

export interface EnhancedTextareaProps extends 
  Omit<FormFieldProps, "children">,
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className"> {
  status?: "default" | "error" | "success";
}

export const EnhancedTextarea = React.forwardRef<HTMLTextAreaElement, EnhancedTextareaProps>(
  ({ id, label, error, hint, required, className, status = "default", ...props }, ref) => {
    const textareaStyles = cn(
      "w-full",
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
        <Textarea
          id={id}
          ref={ref}
          className={textareaStyles}
          aria-invalid={!!error}
          {...props}
        />
      </FormField>
    );
  }
);

EnhancedTextarea.displayName = "EnhancedTextarea";
