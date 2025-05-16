
import { useQuery } from '@tanstack/react-query';
import goalsData from '../mocks/goals.json';
import { toast } from '@/hooks/use-toast';

export function useGoalsQuery(options = {}) {
  return useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return goalsData;
      } catch (error) {
        toast({
          title: "Error",
          description: 'Failed to fetch goals data',
          variant: "destructive"
        });
        throw new Error('Failed to fetch goals data');
      }
    },
    ...options
  });
}
