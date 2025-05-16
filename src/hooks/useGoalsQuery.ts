
import { useQuery } from '@tanstack/react-query';
import goalsData from '../mocks/goals.json';
import { toast } from '@/components/ui/sonner';

export function useGoalsQuery(options = {}) {
  return useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return goalsData;
      } catch (error) {
        toast.error('Failed to fetch goals data');
        throw new Error('Failed to fetch goals data');
      }
    },
    ...options
  });
}
