
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, 
  LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis 
} from 'recharts';
import { ChartBarIcon, TrendingUpIcon, ChevronDownIcon, ChevronUpIcon, FileSpreadsheetIcon } from 'lucide-react';

// Sample data for the charts
const performanceData = [
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

const departmentPerformance = [
  { name: 'Operations', score: 78, target: 75 },
  { name: 'Finance', score: 85, target: 80 },
  { name: 'HR', score: 92, target: 85 },
  { name: 'IT', score: 88, target: 80 },
  { name: 'Sales', score: 76, target: 80 },
  { name: 'Marketing', score: 81, target: 75 },
];

const bonusAllocation = [
  { name: 'Operations', value: 30 },
  { name: 'Finance', value: 25 },
  { name: 'HR', value: 15 },
  { name: 'IT', value: 20 },
  { name: 'Sales', value: 5 },
  { name: 'Marketing', value: 5 },
];

const bonusPrediction = [
  { year: '2023', actual: 850000, predicted: 850000 },
  { year: '2024', actual: 920000, predicted: 950000 },
  { year: '2025', actual: null, predicted: 1050000 },
  { year: '2026', actual: null, predicted: 1150000 },
];

const appraisalsByStatus = [
  { name: 'Completed', value: 58 },
  { name: 'In Progress', value: 27 },
  { name: 'Pending', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Reports = () => {
  const [timeframe, setTimeframe] = useState('yearly');
  const [department, setDepartment] = useState('all');
  
  const chartConfig = {
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

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1>Performance Analytics & Reporting</h1>
          
          <div className="flex items-center gap-4">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="gap-2">
              <FileSpreadsheetIcon size={18} />
              Export to Excel
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Performance Score</span>
                <span className="text-2xl font-bold text-pjiae-blue">85%</span>
              </CardTitle>
              <CardDescription className="flex items-center">
                <span className="flex items-center text-green-600">
                  <ChevronUpIcon size={18} />
                  <span className="ml-1">5% from last period</span>
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData.slice(-6)} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0A66C2" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0A66C2" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="actual" stroke="#0A66C2" fill="url(#colorActual)" />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip content={<></>} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Completed Appraisals</span>
                <span className="text-2xl font-bold text-pjiae-blue">58%</span>
              </CardTitle>
              <CardDescription className="flex items-center">
                <span className="flex items-center text-amber-600">
                  <ChevronUpIcon size={18} />
                  <span className="ml-1">12% from last month</span>
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={appraisalsByStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={45}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {appraisalsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<></>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Projected Bonus Budget</span>
                <span className="text-2xl font-bold text-pjiae-blue">$1.05M</span>
              </CardTitle>
              <CardDescription className="flex items-center">
                <span className="flex items-center text-green-600">
                  <ChevronUpIcon size={18} />
                  <span className="ml-1">10.5% increase for next year</span>
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bonusPrediction} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
                    <Bar dataKey="predicted" fill="#8B5CF6" />
                    <YAxis hide />
                    <Tooltip content={<></>} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Performance Trends</TabsTrigger>
            <TabsTrigger value="department">Department Analysis</TabsTrigger>
            <TabsTrigger value="bonus">Bonus Projections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends Over Time</CardTitle>
                <CardDescription>Comparison of actual performance against targets and previous year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer config={chartConfig}>
                    <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        cursor={{
                          stroke: "#9ca3af",
                          strokeWidth: 1,
                          strokeDasharray: "3 3",
                        }}
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line type="monotone" dataKey="actual" name="actual" stroke="#0A66C2" strokeWidth={2.5} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="target" name="target" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="previousYear" name="previousYear" stroke="#64748B" strokeWidth={1.5} dot={{ r: 3 }} />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="department" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance Comparison</CardTitle>
                <CardDescription>Current performance scores by department relative to targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer config={chartConfig}>
                    <BarChart data={departmentPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        cursor={{
                          fill: "rgba(0, 0, 0, 0.05)",
                        }}
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="score" fill="#0A66C2" name="score" />
                      <Bar dataKey="target" fill="#94A3B8" name="target" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bonus Allocation by Department</CardTitle>
                <CardDescription>Percentage of total bonus budget allocated to each department</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="w-[300px] h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bonusAllocation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {bonusAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {bonusAllocation.map((dept, index) => (
                    <div key={dept.name} className="flex items-center gap-2">
                      <span 
                        className="block w-4 h-4 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></span>
                      <span>{dept.name}: ${(dept.value * 10500).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bonus" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Bonus Budget Projections</CardTitle>
                <CardDescription>Historical and projected bonus allocations for upcoming years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer config={chartConfig}>
                    <BarChart data={bonusPrediction} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        cursor={{
                          fill: "rgba(0, 0, 0, 0.05)",
                        }}
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="actual" fill="#0A66C2" name="actual" />
                      <Bar dataKey="predicted" fill="#8B5CF6" name="predicted" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Factors Affecting Bonus Projections</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <TrendingUpIcon className="mt-0.5 text-green-600" />
                      <div>
                        <p className="font-medium">Performance Improvements</p>
                        <p className="text-muted-foreground text-sm">Overall company performance is projected to increase by 7.5%, contributing to higher bonus allocations</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChartBarIcon className="mt-0.5 text-blue-600" />
                      <div>
                        <p className="font-medium">Company Growth</p>
                        <p className="text-muted-foreground text-sm">Expected revenue growth of 12% will increase the available budget for employee bonuses</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChartBarIcon className="mt-0.5 text-amber-600" />
                      <div>
                        <p className="font-medium">New Incentive Structure</p>
                        <p className="text-muted-foreground text-sm">Improved performance-based incentive structure will target high-performing employees</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bonus Distribution Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium">1</div>
                      <div>
                        <p className="font-medium">Increase allocation for top performers</p>
                        <p className="text-muted-foreground text-sm">Focus 50% of bonus allocation on employees with performance scores above 85%</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">2</div>
                      <div>
                        <p className="font-medium">Balance departmental allocations</p>
                        <p className="text-muted-foreground text-sm">Adjust IT and Operations allocations based on improved performance metrics</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium">3</div>
                      <div>
                        <p className="font-medium">Consider non-monetary incentives</p>
                        <p className="text-muted-foreground text-sm">Supplement financial bonuses with opportunities for growth and recognition</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Reports;
