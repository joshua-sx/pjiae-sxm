
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  isChunkLoadingError: boolean;
}

class ChunkErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    isChunkLoadingError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Detect if this is a chunk loading error
    const isChunkLoadingError = error.message.includes('Loading chunk') || 
                               error.message.includes('imported module') ||
                               error.message.includes('Failed to fetch dynamically');
    
    return { 
      hasError: true, 
      error, 
      isChunkLoadingError 
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRetry = () => {
    // For chunk loading errors, we can try reloading the page
    if (this.state.isChunkLoadingError) {
      window.location.reload();
    } else {
      // For other errors, just reset the error state
      this.setState({ hasError: false, error: null, isChunkLoadingError: false });
    }
  };

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto" />
            <h2 className="text-2xl font-medium">
              {this.state.isChunkLoadingError ? 
                "Failed to load module" : 
                "Something went wrong"}
            </h2>
            <p className="text-muted-foreground">
              {this.state.isChunkLoadingError ? 
                "We couldn't load some required components. This might be due to a network issue or a recent update." : 
                this.state.error?.message || "An unexpected error occurred"}
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <Button
                onClick={this.handleRetry}
                className="flex items-center justify-center gap-2"
              >
                <RefreshCcw size={16} />
                {this.state.isChunkLoadingError ? "Reload Page" : "Try Again"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChunkErrorBoundary;
