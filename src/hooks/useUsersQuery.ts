
import { useQuery } from '@tanstack/react-query';
import usersData from '../mocks/users.json';
import { toast } from '@/hooks/use-toast';

export function useUsersQuery(options = {}) {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return usersData;
      } catch (error) {
        toast({
          title: "Error",
          description: 'Failed to fetch users data',
          variant: "destructive"
        });
        throw new Error('Failed to fetch users data');
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options
  });
}
