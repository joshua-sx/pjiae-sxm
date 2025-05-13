
// Data for the performance analytics charts

export const performanceData = [
  { month: 'Jan', actual: 65, target: 80, previousYear: 50 },
  { month: 'Feb', actual: 72, target: 80, previousYear: 55 },
  { month: 'Mar', actual: 78, target: 80, previousYear: 60 },
  { month: 'Apr', actual: 82, target: 80, previousYear: 65 },
  { month: 'May', actual: 85, target: 80, previousYear: 70 },
  { month: 'Jun', actual: 79, target: 80, previousYear: 75 },
  { month: 'Jul', actual: 88, target: 80, previousYear: 70 },
  { month: 'Aug', actual: 90, target: 80, previousYear: 75 },
  { month: 'Sep', actual: 92, target: 80, previousYear: 68 },
  { month: 'Oct', actual: 85, target: 80, previousYear: 72 },
  { month: 'Nov', actual: 83, target: 80, previousYear: 70 },
  { month: 'Dec', actual: 87, target: 80, previousYear: 73 },
];

export const departmentPerformance = [
  { name: 'Operations', score: 78, target: 75 },
  { name: 'Finance', score: 85, target: 80 },
  { name: 'HR', score: 92, target: 85 },
  { name: 'IT', score: 88, target: 80 },
  { name: 'Sales', score: 76, target: 80 },
  { name: 'Marketing', score: 81, target: 75 },
];

export const bonusAllocation = [
  { name: 'Operations', value: 30 },
  { name: 'Finance', value: 25 },
  { name: 'HR', value: 15 },
  { name: 'IT', value: 20 },
  { name: 'Sales', value: 5 },
  { name: 'Marketing', value: 5 },
];

export const bonusPrediction = [
  { year: '2023', actual: 850000, predicted: 850000 },
  { year: '2024', actual: 920000, predicted: 950000 },
  { year: '2025', actual: null, predicted: 1050000 },
  { year: '2026', actual: null, predicted: 1150000 },
];

export const appraisalsByStatus = [
  { name: 'Completed', value: 58 },
  { name: 'In Progress', value: 27 },
  { name: 'Pending', value: 15 },
];

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const chartConfig = {
  actual: { label: 'Actual', color: '#0A66C2' },
  target: { label: 'Target', color: '#94A3B8' },
  previousYear: { label: 'Previous Year', color: '#64748B' },
  operations: { label: 'Operations', color: '#0088FE' },
  finance: { label: 'Finance', color: '#00C49F' },
  hr: { label: 'HR', color: '#FFBB28' },
  it: { label: 'IT', color: '#FF8042' },
  sales: { label: 'Sales', color: '#8884d8' },
  marketing: { label: 'Marketing', color: '#82ca9d' },
  completed: { label: 'Completed', color: '#4CAF50' },
  inProgress: { label: 'In Progress', color: '#FF9800' },
  pending: { label: 'Pending', color: '#F44336' },
  predicted: { label: 'Predicted', color: '#8B5CF6' },
};
