
import { useQuery } from '@tanstack/react-query';
import documentsData from '../mocks/documents.json';
import { toast } from '@/components/ui/sonner';

export function useDocumentsQuery(options = {}) {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return documentsData;
      } catch (error) {
        toast.error('Failed to fetch documents data');
        throw new Error('Failed to fetch documents data');
      }
    },
    ...options
  });
}
