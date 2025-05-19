
import { z } from 'zod';

// Form schema
export const formSchema = z.object({
  title: z.string().min(5, 'Goal title must be at least 5 characters'),
  description: z.string().optional(),
  assigneeId: z.string().min(1, 'Please select an assignee'),
  formulaExpression: z.string().min(5, 'Please provide a formula for final scoring'),
});

export type FormValues = z.infer<typeof formSchema>;

// Subgoal type definition
export type Subgoal = {
  id: string;
  name: string;
  type: 'number' | 'currency' | 'percentage' | 'date' | 'binary' | 'custom';
  unit: string;
  weight: number;
  config: {
    min?: number;
    max?: number;
    trueScore?: number;
    falseScore?: number;
    targetDate?: Date;
    expression?: string;
  };
};

// Mock direct reports
export const directReports = [
  { id: '1', name: 'John Smith' },
  { id: '2', name: 'Jane Doe' },
  { id: '3', name: 'Mark Johnson' },
];
