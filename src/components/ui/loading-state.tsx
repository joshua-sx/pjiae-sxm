
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  count?: number;
  variant?: 'default' | 'card' | 'table' | 'list';
}

export function LoadingState({ count = 3, variant = 'default' }: LoadingStateProps) {
  const renderSkeletons = () => {
    const skeletons = [];
    
    for (let i = 0; i < count; i++) {
      switch (variant) {
        case 'card':
          skeletons.push(
            <div key={i} className="rounded-lg border p-4 shadow">
              <Skeleton className="h-6 w-2/3 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5 mb-4" />
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-20 rounded" />
              </div>
            </div>
          );
          break;
        
        case 'table':
          skeletons.push(
            <div key={i} className="border-b py-4">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-8 w-20 rounded" />
              </div>
            </div>
          );
          break;
          
        case 'list':
          skeletons.push(
            <div key={i} className="py-3 border-b">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full mr-3" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </div>
          );
          break;
          
        default:
          skeletons.push(
            <div key={i} className="space-y-2 mb-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          );
      }
    }
    
    return skeletons;
  };

  return <div className="space-y-4">{renderSkeletons()}</div>;
}
