
import { z } from 'zod';

// Form schema
export const formSchema = z.object({
  title: z.string().min(5, 'Goal title must be at least 5 characters'),
  description: z.string().optional(),
  assigneeIds: z.array(z.string()).min(1, 'Please select at least one assignee'),
  formulaExpression: z.string().min(5, 'Please provide a formula for final scoring'),
});

export type FormValues = z.infer<typeof formSchema>;

// Subgoal type definition with support for hierarchical structure
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

// New Goal type for the hierarchical structure
export type Goal = {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  children: Goal[];
  collapsed?: boolean;
  rollUp?: boolean;
  owner?: string;
  subgoals?: Subgoal[];
};

// Mock direct reports with more employees
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
  { id: '11', name: 'William Anderson' },
  { id: '12', name: 'Patricia Thomas' },
  { id: '13', name: 'James Jackson' },
  { id: '14', name: 'Barbara White' },
  { id: '15', name: 'Richard Harris' },
  { id: '16', name: 'Susan Martin' },
  { id: '17', name: 'Joseph Thompson' },
  { id: '18', name: 'Jessica Garcia' },
  { id: '19', name: 'Thomas Martinez' },
  { id: '20', name: 'Nancy Robinson' }
];

