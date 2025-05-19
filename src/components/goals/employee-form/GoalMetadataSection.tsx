
import React, { useState } from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit } from 'lucide-react';
import { type Control } from 'react-hook-form';
import { type FormValues, type Subgoal } from './types';
import { EmployeeCombobox } from './EmployeeCombobox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GoalMetadataSectionProps {
  control: Control<FormValues>;
  directReports: { id: string; name: string; }[];
  subgoals: Subgoal[];
  onAddSubgoal: (subgoal: Subgoal) => void;
}

export const GoalMetadataSection: React.FC<GoalMetadataSectionProps> = ({ 
  control, 
  directReports,
  subgoals,
  onAddSubgoal
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [subgoalName, setSubgoalName] = useState('');
  const [subgoalType, setSubgoalType] = useState<Subgoal['type']>('number');
  const [unit, setUnit] = useState('');

  const handleAddMeasurement = () => {
    if (!subgoalName.trim()) return;
    
    const newSubgoal: Subgoal = {
      id: `subgoal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: subgoalName,
      type: subgoalType,
      unit: unit,
      weight: 1,
      config: {
        min: 1,
        max: 5
      }
    };
    
    // Add the subgoal
    onAddSubgoal(newSubgoal);
    
    // Reset the form
    setSubgoalName('');
    setUnit('');
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goal Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., Increase customer satisfaction by 15%" />
                </FormControl>
                <FormDescription>
                  A clear, concise title for the goal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Provide more context and details about the goal" 
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="assigneeIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assignees</FormLabel>
                <FormDescription>
                  Select one or more employees responsible for achieving this goal
                </FormDescription>
                <FormControl>
                  <EmployeeCombobox
                    employees={directReports}
                    selectedEmployees={field.value}
                    onEmployeeSelect={(employeeIds) => field.onChange(employeeIds)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>

      {subgoals.length > 0 && (
        <div className="px-6 mb-4">
          <h3 className="text-lg font-semibold mb-3">Measurements</h3>
          <div className="space-y-3">
            {subgoals.map((subgoal) => (
              <div key={subgoal.id} className="flex items-center justify-between bg-muted p-3 rounded-md">
                <div>
                  <p className="font-medium">{subgoal.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {subgoal.type.charAt(0).toUpperCase() + subgoal.type.slice(1)}
                    {subgoal.unit && ` (${subgoal.unit})`}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <CardFooter>
        <Button 
          onClick={() => setIsDialogOpen(true)} 
          variant="outline" 
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Measurement
        </Button>
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Measurement</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="subgoal-name">Measurement Name</Label>
              <Input 
                id="subgoal-name" 
                placeholder="e.g., Customer Satisfaction Score"
                value={subgoalName}
                onChange={(e) => setSubgoalName(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subgoal-type">Type</Label>
                <Select value={subgoalType} onValueChange={(value) => setSubgoalType(value as Subgoal['type'])}>
                  <SelectTrigger id="subgoal-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="currency">Currency</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="binary">Binary (Yes/No)</SelectItem>
                    <SelectItem value="custom">Custom Expression</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="subgoal-unit">Unit</Label>
                <Input
                  id="subgoal-unit"
                  placeholder="e.g., %, $, points"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddMeasurement} disabled={!subgoalName.trim()}>
              Add Measurement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
