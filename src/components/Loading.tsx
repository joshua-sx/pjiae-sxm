
import React from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-pjiae-blue animate-spin mb-4" />
          <h2 className="text-2xl font-medium text-gray-700">Loading...</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Please wait while we load the content
          </p>
        </div>
        
        <div className="space-y-4 w-full mt-8">
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
