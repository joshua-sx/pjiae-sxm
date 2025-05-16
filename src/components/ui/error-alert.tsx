
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorAlertProps {
  title?: string;
  description?: string;
  error?: any;
  onRetry?: () => void;
}

export function ErrorAlert({ 
  title = "An error occurred", 
  description = "There was a problem with your request.",
  error,
  onRetry
}: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className="my-4">
      <XCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2">
        <p>{description}</p>
        {error && error.message && (
          <p className="text-xs mt-2 font-mono">{error.message}</p>
        )}
        {onRetry && (
          <Button 
            onClick={onRetry} 
            variant="outline" 
            size="sm" 
            className="mt-2"
          >
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
