
import { useQuery } from '@tanstack/react-query';
import departmentGoalsData from '../mocks/departmentGoals.json';
import { toast } from '@/components/ui/sonner';

export function useDepartmentGoalsQuery(options = {}) {
  return useQuery({
    queryKey: ['departmentGoals'],
    queryFn: async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return departmentGoalsData;
      } catch (error) {
        toast.error('Failed to fetch department goals data');
        throw new Error('Failed to fetch department goals data');
      }
    },
    ...options
  });
}

// Export an alias for compatibility with existing code
export const useDivisionGoalsQuery = useDepartmentGoalsQuery;
