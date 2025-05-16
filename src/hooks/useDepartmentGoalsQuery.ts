
import { useQuery } from '@tanstack/react-query';
import departmentGoalsData from '../mocks/departmentGoals.json';
import { toast } from '@/hooks/use-toast';
import { UnifiedGoal } from '@/types/unifiedGoals';

export function useDepartmentGoalsQuery(options = {}) {
  return useQuery({
    queryKey: ['departmentGoals'],
    queryFn: async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Transform department goals into UnifiedGoal format
        const transformedGoals: UnifiedGoal[] = departmentGoalsData.map(goal => {
          // Ensure we only use valid statuses
          let status = goal.status;
          // Convert any invalid status to 'submitted' as default
          if (!['submitted', 'flagged', 'approved'].includes(status as string)) {
            status = 'submitted';
          }
          
          return {
            id: goal.id,
            title: goal.title,
            description: goal.description,
            status: status as any, // Will be properly typed in UnifiedGoal
            createdBy: goal.assignedBy,
            createdAt: new Date(goal.createdAt),
            type: 'department',
            creatorName: goal.assignedBy,
            creatorRole: 'Director',
            department: goal.departmentId,
            departmentName: goal.departmentName,
            employeeName: '',
            progress: goal.progress,
          };
        });
        
        return transformedGoals;
      } catch (error) {
        toast({
          title: "Error",
          description: 'Failed to fetch department goals data',
          variant: "destructive"
        });
        throw new Error('Failed to fetch department goals data');
      }
    },
    ...options
  });
}

// Export an alias for compatibility with existing code
export const useDivisionGoalsQuery = useDepartmentGoalsQuery;
