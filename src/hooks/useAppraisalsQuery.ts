
import { useQuery } from '@tanstack/react-query';
import appraisalsData from '../mocks/appraisals.json';
import { toast } from '@/hooks/use-toast';

export function useAppraisalsQuery(options = {}) {
  return useQuery({
    queryKey: ['appraisals'],
    queryFn: async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return appraisalsData;
      } catch (error) {
        toast({
          title: "Error",
          description: 'Failed to fetch appraisals data',
          variant: "destructive"
        });
        throw new Error('Failed to fetch appraisals data');
      }
    },
    ...options
  });
}
