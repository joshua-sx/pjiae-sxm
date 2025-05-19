
import { z } from 'zod';

// Form schema
export const formSchema = z.object({
  title: z.string().min(5, 'Goal title must be at least 5 characters'),
  description: z.string().optional(),
  assigneeIds: z.array(z.string()).min(1, 'Please select at least one assignee'),
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
  { id: '4', name: 'Sarah Williams' },
  { id: '5', name: 'Michael Brown' },
  { id: '6', name: 'Emily Davis' },
  { id: '7', name: 'Robert Wilson' },
  { id: '8', name: 'Jennifer Taylor' },
  { id: '9', name: 'David Martinez' },
  { id: '10', name: 'Lisa Rodriguez' },
];
