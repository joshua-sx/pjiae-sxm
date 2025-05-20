
import { useQuery } from '@tanstack/react-query';
import goalsData from '../mocks/goals.json';
import { toast } from '@/hooks/use-toast';

async function defaultQueryFn() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return goalsData;
}

export function useGoalsQuery(options: Record<string, any> = {}) {
  const queryFn = options.queryFn ?? defaultQueryFn;

  return useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      try {
        return await queryFn();
      } catch (e) {
        toast({
          title: 'Error',
          description: 'Failed to fetch goals data',
          variant: 'destructive'
        });
        throw e;
      }
    },
    ...options,
  });
}
