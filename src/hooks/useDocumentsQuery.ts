
import { useQuery } from '@tanstack/react-query';
import documentsData from '../mocks/documents.json';
import { toast } from '@/hooks/use-toast';

export function useDocumentsQuery(options = {}) {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return documentsData;
      } catch (error) {
        toast({
          title: "Error",
          description: 'Failed to fetch documents data',
          variant: "destructive"
        });
        throw new Error('Failed to fetch documents data');
      }
    },
    ...options
  });
}
