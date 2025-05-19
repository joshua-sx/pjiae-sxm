
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
import { Plus, Trash2, Edit, Calendar, Check, X, GripVertical, ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { type Control } from 'react-hook-form';
import { type FormValues, type Subgoal } from './types';
import { EmployeeCombobox } from './EmployeeCombobox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useSubgoalManager } from '@/hooks/useSubgoalManager';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface GoalMetadataSectionProps {
  control: Control<FormValues>;
  directReports: { id: string; name: string; }[];
  subgoals: Subgoal[];
  onAddSubgoal: (subgoal: Subgoal) => void;
  onSubgoalsChange: (subgoals: Subgoal[]) => void;
}

// Sortable measurement item component
const SortableMeasurementItem = ({ subgoal, onEdit, onDelete, id }: { 
  subgoal: Subgoal; 
  onEdit: () => void; 
  onDelete: () => void;
  id: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="bg-muted rounded-md p-3 mb-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="touch-none cursor-grab">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">{subgoal.name}</p>
            <p className="text-sm text-muted-foreground">
              {subgoal.type.charAt(0).toUpperCase() + subgoal.type.slice(1)}
              {subgoal.unit && ` (${subgoal.unit})`}
              {' • '}
              Weight: {subgoal.weight}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-3 pl-6 border-l-2 border-muted-foreground/20">
          <div className="text-sm space-y-1">
            <p><strong>Type:</strong> {subgoal.type}</p>
            {subgoal.unit && <p><strong>Unit:</strong> {subgoal.unit}</p>}
            <p><strong>Weight:</strong> {subgoal.weight}</p>
            {subgoal.config.min !== undefined && <p><strong>Min:</strong> {subgoal.config.min}</p>}
            {subgoal.config.max !== undefined && <p><strong>Max:</strong> {subgoal.config.max}</p>}
            {subgoal.type === 'binary' && (
              <>
                {subgoal.config.trueScore !== undefined && <p><strong>Pass Score:</strong> {subgoal.config.trueScore}</p>}
                {subgoal.config.falseScore !== undefined && <p><strong>Fail Score:</strong> {subgoal.config.falseScore}</p>}
              </>
            )}
            {subgoal.type === 'date' && subgoal.config.targetDate && (
              <p><strong>Target Date:</strong> {format(new Date(subgoal.config.targetDate), 'PPP')}</p>
            )}
            {subgoal.type === 'custom' && subgoal.config.expression && (
              <p><strong>Expression:</strong> {subgoal.config.expression}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const GoalMetadataSection: React.FC<GoalMetadataSectionProps> = ({ 
  control, 
  directReports,
  subgoals,
  onAddSubgoal,
  onSubgoalsChange
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingSubgoal, setEditingSubgoal] = useState<Subgoal | null>(null);
  
  // Form state for new or editing measurement
  const [measurementName, setMeasurementName] = useState('');
  const [measurementType, setMeasurementType] = useState<Subgoal['type']>('number');
  const [measurementUnit, setMeasurementUnit] = useState('');
  const [measurementWeight, setMeasurementWeight] = useState('1');
  const [minValue, setMinValue] = useState('1');
  const [maxValue, setMaxValue] = useState('5');
  const [trueScore, setTrueScore] = useState('5');
  const [falseScore, setFalseScore] = useState('1');
  const [targetDate, setTargetDate] = useState<Date | undefined>();
  const [expression, setExpression] = useState('');

  const { handleRemoveSubgoal, moveSubgoal } = useSubgoalManager(subgoals, onSubgoalsChange);

  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handler for drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = subgoals.findIndex(subgoal => subgoal.id === active.id);
      const newIndex = subgoals.findIndex(subgoal => subgoal.id === over.id);
      
      moveSubgoal(oldIndex, newIndex);
    }
  };

  const openDrawerForNewMeasurement = () => {
    setEditingSubgoal(null);
    resetFormFields();
    setIsDrawerOpen(true);
  };

  const openDrawerForEditMeasurement = (subgoal: Subgoal) => {
    setEditingSubgoal(subgoal);
    setMeasurementName(subgoal.name);
    setMeasurementType(subgoal.type);
    setMeasurementUnit(subgoal.unit || '');
    setMeasurementWeight(subgoal.weight.toString());
    
    if (subgoal.type === 'number' || subgoal.type === 'currency' || subgoal.type === 'percentage') {
      setMinValue(subgoal.config.min?.toString() || '1');
      setMaxValue(subgoal.config.max?.toString() || '5');
    }
    
    if (subgoal.type === 'binary') {
      setTrueScore(subgoal.config.trueScore?.toString() || '5');
      setFalseScore(subgoal.config.falseScore?.toString() || '1');
    }
    
    if (subgoal.type === 'date' && subgoal.config.targetDate) {
      setTargetDate(new Date(subgoal.config.targetDate));
    }
    
    if (subgoal.type === 'custom') {
      setExpression(subgoal.config.expression || '');
    }
    
    setIsDrawerOpen(true);
  };

  const resetFormFields = () => {
    setMeasurementName('');
    setMeasurementType('number');
    setMeasurementUnit('');
    setMeasurementWeight('1');
    setMinValue('1');
    setMaxValue('5');
    setTrueScore('5');
    setFalseScore('1');
    setTargetDate(undefined);
    setExpression('');
  };

  const handleSaveMeasurement = () => {
    if (!measurementName.trim()) return;
    
    const weight = parseFloat(measurementWeight) || 1;
    
    let config: Subgoal['config'] = {};
    
    switch (measurementType) {
      case 'number':
      case 'currency':
      case 'percentage':
        config = {
          min: parseFloat(minValue) || 1,
          max: parseFloat(maxValue) || 5
        };
        break;
      case 'binary':
        config = {
          trueScore: parseFloat(trueScore) || 5,
          falseScore: parseFloat(falseScore) || 1
        };
        break;
      case 'date':
        config = {
          targetDate: targetDate
        };
        break;
      case 'custom':
        config = {
          expression: expression
        };
        break;
    }
    
    if (editingSubgoal) {
      // Update existing subgoal
      const updatedSubgoals = subgoals.map(subgoal => 
        subgoal.id === editingSubgoal.id ? {
          ...subgoal,
          name: measurementName,
          type: measurementType,
          unit: measurementUnit,
          weight: weight,
          config: config
        } : subgoal
      );
      onSubgoalsChange(updatedSubgoals);
    } else {
      // Create new subgoal
      const newSubgoal: Subgoal = {
        id: `subgoal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: measurementName,
        type: measurementType,
        unit: measurementUnit,
        weight: weight,
        config: config
      };
      onAddSubgoal(newSubgoal);
    }
    
    setIsDrawerOpen(false);
    resetFormFields();
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

      {/* Measurements section */}
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Measurements</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={openDrawerForNewMeasurement}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Measurement
          </Button>
        </div>
        
        {subgoals.length > 0 ? (
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={subgoals.map(s => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {subgoals.map((subgoal) => (
                  <SortableMeasurementItem 
                    key={subgoal.id}
                    id={subgoal.id}
                    subgoal={subgoal}
                    onEdit={() => openDrawerForEditMeasurement(subgoal)}
                    onDelete={() => handleRemoveSubgoal(subgoal.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="text-center p-4 border border-dashed rounded-md">
            <p className="text-muted-foreground">No measurements added yet</p>
          </div>
        )}
      </div>

      {/* Measurement drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="px-4 max-h-[85vh] overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>{editingSubgoal ? 'Edit Measurement' : 'Add Measurement'}</DrawerTitle>
          </DrawerHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="measurement-name">Measurement Name</Label>
                <Input 
                  id="measurement-name" 
                  placeholder="e.g., Customer Satisfaction Score"
                  value={measurementName}
                  onChange={(e) => setMeasurementName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="measurement-type">Measurement Type</Label>
                <Select value={measurementType} onValueChange={(value) => setMeasurementType(value as Subgoal['type'])}>
                  <SelectTrigger id="measurement-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="currency">Currency</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="binary">Binary (Pass/Fail)</SelectItem>
                    <SelectItem value="date">Date Range</SelectItem>
                    <SelectItem value="custom">Custom Formula</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="measurement-unit">Unit</Label>
                  <Input
                    id="measurement-unit"
                    placeholder="e.g., %, $, points"
                    value={measurementUnit}
                    onChange={(e) => setMeasurementUnit(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="measurement-weight">Weight (%)</Label>
                  <Input
                    id="measurement-weight"
                    type="number"
                    min="1"
                    value={measurementWeight}
                    onChange={(e) => setMeasurementWeight(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Type-specific configurations */}
              {(measurementType === 'number' || measurementType === 'currency' || measurementType === 'percentage') && (
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <Label htmlFor="min-value">Minimum Value</Label>
                    <Input
                      id="min-value"
                      type="number"
                      value={minValue}
                      onChange={(e) => setMinValue(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-value">Maximum Value</Label>
                    <Input
                      id="max-value"
                      type="number"
                      value={maxValue}
                      onChange={(e) => setMaxValue(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              {measurementType === 'binary' && (
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <Label htmlFor="true-score">Pass Value</Label>
                    <Input
                      id="true-score"
                      type="number"
                      value={trueScore}
                      onChange={(e) => setTrueScore(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="false-score">Fail Value</Label>
                    <Input
                      id="false-score"
                      type="number"
                      value={falseScore}
                      onChange={(e) => setFalseScore(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              {measurementType === 'date' && (
                <div className="border-t pt-4">
                  <Label htmlFor="target-date" className="block mb-2">Target Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !targetDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {targetDate ? format(targetDate, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={targetDate}
                        onSelect={setTargetDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              
              {measurementType === 'custom' && (
                <div className="border-t pt-4">
                  <Label htmlFor="expression">Custom Expression</Label>
                  <Textarea
                    id="expression"
                    placeholder="e.g., (x > 90) ? 5 : (x > 70) ? 4 : 3"
                    rows={3}
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Define a custom formula for calculating the score. Use variables, comparisons, and math operations.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <DrawerFooter>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveMeasurement} disabled={!measurementName.trim()}>
                {editingSubgoal ? 'Update' : 'Add'} Measurement
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Card>
  );
};
