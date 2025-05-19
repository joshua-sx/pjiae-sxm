
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
import { 
  Plus, 
  Trash2, 
  Edit, 
  Calendar, 
  ChevronsUpDown,
  GripVertical, 
  ChevronDown, 
  ChevronUp,
  ToggleRight,
  Percent,
  CircleDollarSign,
  Hash,
  Check,
  X
} from 'lucide-react';
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

  // Get icon based on measurement type
  const getTypeIcon = () => {
    switch (subgoal.type) {
      case 'binary':
        return <ToggleRight className="h-4 w-4 text-green-500" />;
      case 'percentage':
        return <Percent className="h-4 w-4 text-purple-500" />;
      case 'currency':
        return <CircleDollarSign className="h-4 w-4 text-amber-500" />;
      case 'date':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'custom':
        return <Hash className="h-4 w-4 text-slate-500" />;
      default:
        return <Hash className="h-4 w-4 text-slate-500" />;
    }
  };

  // Get summary text based on measurement type
  const getSummaryText = () => {
    switch (subgoal.type) {
      case 'binary':
        return `${subgoal.config.trueScore} / ${subgoal.config.falseScore}`;
      case 'percentage':
        return `${subgoal.config.min}% - ${subgoal.config.max}%`;
      case 'currency':
        if (subgoal.config.operator === 'range') {
          return `${subgoal.unit} ${subgoal.config.min} - ${subgoal.config.max}`;
        } else {
          const operator = subgoal.config.operator || '≥';
          const amount = subgoal.config.amount || subgoal.config.target || 0;
          return `${operator} ${subgoal.unit} ${amount}`;
        }
      case 'number':
        return `${subgoal.config.min} - ${subgoal.config.max} ${subgoal.unit}`;
      case 'date':
        return subgoal.config.targetDate 
          ? `By ${format(new Date(subgoal.config.targetDate), 'PPP')}`
          : 'No deadline set';
      case 'custom':
        return subgoal.config.expression || 'Custom formula';
      default:
        return '';
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="bg-card border rounded-md p-3 mb-2 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div {...attributes} {...listeners} className="touch-none cursor-grab">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2">
            {getTypeIcon()}
            <div>
              <p className="font-medium">{subgoal.name}</p>
              <p className="text-sm text-muted-foreground">
                {getSummaryText()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-muted rounded-full text-xs font-medium">
            {subgoal.weight}%
          </span>
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
            <p><strong>Weight:</strong> {subgoal.weight}%</p>
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
  const [optionA, setOptionA] = useState('Pass');
  const [optionB, setOptionB] = useState('Fail');
  const [positiveResult, setPositiveResult] = useState<'A' | 'B'>('A');
  const [currencyCode, setCurrencyCode] = useState('$');
  const [dateMode, setDateMode] = useState<'deadline' | 'range'>('deadline');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [operator, setOperator] = useState<'≥' | '≤' | '=' | 'range'>('≥');
  const [targetPercentage, setTargetPercentage] = useState('100');
  const [amountValue, setAmountValue] = useState('0');

  const { handleRemoveSubgoal, moveSubgoal } = useSubgoalManager(subgoals, onSubgoalsChange);

  // Calculate total weight
  const totalWeight = subgoals.reduce((sum, subgoal) => sum + subgoal.weight, 0);
  const remainingWeight = 100 - totalWeight;
  const isWeightValid = totalWeight <= 100;

  // Sensors for drag and drop - Fix the type issue
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: (event) => {
        // Cast to satisfy TypeScript
        return sortableKeyboardCoordinates(event as any);
      },
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
    
    if (subgoal.type === 'number' || subgoal.type === 'currency') {
      setMinValue(subgoal.config.min?.toString() || '1');
      setMaxValue(subgoal.config.max?.toString() || '5');
      
      if (subgoal.type === 'currency') {
        setCurrencyCode(subgoal.unit || '$');
        setOperator(subgoal.config.operator || '≥');
        
        if (subgoal.config.operator === 'range') {
          setMinValue(subgoal.config.min?.toString() || '1');
          setMaxValue(subgoal.config.max?.toString() || '5');
        } else {
          setAmountValue(subgoal.config.amount?.toString() || 
                        subgoal.config.target?.toString() || '0');
        }
      }
    }
    
    if (subgoal.type === 'percentage') {
      setOperator(subgoal.config.operator || '≥');
      setTargetPercentage(subgoal.config.target?.toString() || '100');
    }
    
    if (subgoal.type === 'binary') {
      setTrueScore(subgoal.config.trueScore?.toString() || '5');
      setFalseScore(subgoal.config.falseScore?.toString() || '1');
      setOptionA(subgoal.config.optionA || 'Pass');
      setOptionB(subgoal.config.optionB || 'Fail');
      setPositiveResult(subgoal.config.positiveIs || 'A');
    }
    
    if (subgoal.type === 'date') {
      setDateMode(subgoal.config.mode || 'deadline');
      
      if (subgoal.config.targetDate) {
        setTargetDate(new Date(subgoal.config.targetDate));
      }
      
      if (subgoal.config.startDate) {
        setStartDate(new Date(subgoal.config.startDate));
      }
      
      if (subgoal.config.endDate) {
        setEndDate(new Date(subgoal.config.endDate));
      }
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
    setMeasurementWeight(remainingWeight > 0 ? remainingWeight.toString() : '1');
    setMinValue('1');
    setMaxValue('5');
    setTrueScore('5');
    setFalseScore('1');
    setTargetDate(undefined);
    setExpression('');
    setOptionA('Pass');
    setOptionB('Fail');
    setPositiveResult('A');
    setCurrencyCode('$');
    setDateMode('deadline');
    setStartDate(undefined);
    setEndDate(undefined);
    setOperator('≥');
    setTargetPercentage('100');
    setAmountValue('0');
  };

  const isFormValid = () => {
    if (!measurementName.trim()) return false;
    
    const weight = parseFloat(measurementWeight);
    if (isNaN(weight) || weight <= 0 || weight > 100) return false;
    
    // Check type-specific validations
    switch(measurementType) {
      case 'number':
        return !isNaN(parseFloat(minValue)) && !isNaN(parseFloat(maxValue));
      case 'currency':
        if (operator === 'range') {
          return !isNaN(parseFloat(minValue)) && !isNaN(parseFloat(maxValue));
        } else {
          return !isNaN(parseFloat(amountValue));
        }
      case 'percentage':
        return !isNaN(parseFloat(targetPercentage));
      case 'binary':
        return !!optionA.trim() && !!optionB.trim();
      case 'date':
        return dateMode === 'deadline' ? !!targetDate : (!!startDate && !!endDate);
      case 'custom':
        return !!expression.trim();
      default:
        return true;
    }
  };

  const handleSaveMeasurement = () => {
    if (!isFormValid()) return;
    
    const weight = parseFloat(measurementWeight) || 1;
    
    let config: Subgoal['config'] = {};
    let unit = measurementUnit;
    
    switch (measurementType) {
      case 'number':
        config = {
          min: parseFloat(minValue) || 1,
          max: parseFloat(maxValue) || 5
        };
        break;
      case 'currency':
        unit = currencyCode;
        
        if (operator === 'range') {
          config = {
            operator: operator,
            min: parseFloat(minValue) || 1,
            max: parseFloat(maxValue) || 5
          };
        } else {
          config = {
            operator: operator,
            amount: parseFloat(amountValue) || 0
          };
        }
        break;
      case 'percentage':
        config = {
          operator: operator,
          target: parseFloat(targetPercentage) || 100,
          min: 0,
          max: 100
        };
        unit = '%';
        break;
      case 'binary':
        config = {
          trueScore: parseFloat(trueScore) || 5,
          falseScore: parseFloat(falseScore) || 1,
          optionA: optionA,
          optionB: optionB,
          positiveIs: positiveResult
        };
        break;
      case 'date':
        config = {
          mode: dateMode,
          targetDate: targetDate,
          startDate: startDate,
          endDate: endDate
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
          unit: unit,
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
        unit: unit,
        weight: weight,
        config: config
      };
      onAddSubgoal(newSubgoal);
    }
    
    setIsDrawerOpen(false);
    resetFormFields();
  };

  // Render type-specific configuration fields
  const renderTypeSpecificFields = () => {
    switch (measurementType) {
      case 'number':
        return (
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
            <div>
              <Label htmlFor="measurement-unit">Unit (optional)</Label>
              <Input
                id="measurement-unit"
                placeholder="e.g., points, items"
                value={measurementUnit}
                onChange={(e) => setMeasurementUnit(e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'currency':
        return (
          <div className="grid gap-4 border-t pt-4">
            <div>
              <Label htmlFor="currency-code">Currency</Label>
              <Select value={currencyCode} onValueChange={setCurrencyCode}>
                <SelectTrigger id="currency-code">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$">USD ($)</SelectItem>
                  <SelectItem value="€">EUR (€)</SelectItem>
                  <SelectItem value="£">GBP (£)</SelectItem>
                  <SelectItem value="¥">JPY (¥)</SelectItem>
                  <SelectItem value="₹">INR (₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency-operator">Operator</Label>
              <Select value={operator} onValueChange={setOperator as (value: string) => void}>
                <SelectTrigger id="currency-operator">
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="≥">≥ (Greater than or equal)</SelectItem>
                  <SelectItem value="≤">≤ (Less than or equal)</SelectItem>
                  <SelectItem value="=">=</SelectItem>
                  <SelectItem value="range">Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {operator === 'range' ? (
              <div className="grid grid-cols-2 gap-4">
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
            ) : (
              <div>
                <Label htmlFor="amount-value">Amount</Label>
                <Input
                  id="amount-value"
                  type="number"
                  value={amountValue}
                  onChange={(e) => setAmountValue(e.target.value)}
                />
              </div>
            )}
          </div>
        );
      
      case 'percentage':
        return (
          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div>
              <Label htmlFor="percentage-operator">Operator</Label>
              <Select value={operator} onValueChange={setOperator as (value: string) => void}>
                <SelectTrigger id="percentage-operator">
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="≥">≥ (Greater than or equal)</SelectItem>
                  <SelectItem value="≤">≤ (Less than or equal)</SelectItem>
                  <SelectItem value="=">=</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="target-percentage">Target Percentage (%)</Label>
              <Input
                id="target-percentage"
                type="number"
                min="0"
                max="100"
                value={targetPercentage}
                onChange={(e) => setTargetPercentage(e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'binary':
        return (
          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div>
              <Label htmlFor="option-a">Option A (e.g., "Pass")</Label>
              <Input
                id="option-a"
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="option-b">Option B (e.g., "Fail")</Label>
              <Input
                id="option-b"
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="positive-result">Positive Result</Label>
              <Select value={positiveResult} onValueChange={setPositiveResult as (value: string) => void}>
                <SelectTrigger id="positive-result">
                  <SelectValue placeholder="Select positive result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Option A ({optionA})</SelectItem>
                  <SelectItem value="B">Option B ({optionB})</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
          </div>
        );
      
      case 'date':
        return (
          <div className="border-t pt-4 space-y-4">
            <div>
              <Label htmlFor="date-mode" className="block mb-2">Mode</Label>
              <Select value={dateMode} onValueChange={setDateMode as (value: string) => void}>
                <SelectTrigger id="date-mode">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deadline">Single Deadline</SelectItem>
                  <SelectItem value="range">Date Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {dateMode === 'deadline' ? (
              <div>
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
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date" className="block mb-2">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="end-date" className="block mb-2">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'custom':
        return (
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
              <br />
              Available variables: <code>x</code> (actual value), <code>target</code> (target value).
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Render type icon with tooltip descriptions
  const renderTypeIcon = (type: Subgoal['type']) => {
    switch (type) {
      case 'binary':
        return <ToggleRight className="h-4 w-4 text-green-500" />;
      case 'percentage':
        return <Percent className="h-4 w-4 text-purple-500" />;
      case 'currency':
        return <CircleDollarSign className="h-4 w-4 text-amber-500" />;
      case 'number':
        return <Hash className="h-4 w-4 text-slate-500" />;  
      case 'date':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'custom':
        return <Hash className="h-4 w-4 text-slate-500" />;
      default:
        return null;
    }
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
        
        {/* Weight progress indicator */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Total Weight</span>
            <span className={cn(
              totalWeight === 100 ? "text-green-600 font-medium" : 
              totalWeight > 100 ? "text-red-600 font-medium" : ""
            )}>
              {totalWeight}% of 100%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div 
              className={cn(
                "h-2.5 rounded-full", 
                totalWeight === 100 ? "bg-green-500" : 
                totalWeight > 100 ? "bg-red-500" : "bg-blue-500"
              )}
              style={{ width: `${Math.min(totalWeight, 100)}%` }}
            ></div>
          </div>
          {!isWeightValid && (
            <p className="text-sm text-red-500 mt-1">
              Total weight exceeds 100%. Please adjust measurement weights.
            </p>
          )}
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
            <p className="text-sm text-muted-foreground mt-1">
              Click the "Add Measurement" button to define how this goal will be measured
            </p>
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
                    <SelectItem value="number" className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-slate-500" />
                        <span>Number</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="currency" className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <CircleDollarSign className="h-4 w-4 text-amber-500" />
                        <span>Currency</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="percentage" className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Percent className="h-4 w-4 text-purple-500" />
                        <span>Percentage</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="binary" className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <ToggleRight className="h-4 w-4 text-green-500" />
                        <span>Binary (Pass/Fail)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="date" className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>Date</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="custom" className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-slate-500" />
                        <span>Custom Formula</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Select the type of measurement that best fits your goal
                </p>
              </div>
              
              <div>
                <Label htmlFor="measurement-weight">Weight (%)</Label>
                <Input
                  id="measurement-weight"
                  type="number"
                  min="1"
                  max="100"
                  value={measurementWeight}
                  onChange={(e) => setMeasurementWeight(e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  The weight of this measurement in the overall goal (all weights must sum to 100%)
                </p>
              </div>
              
              {/* Type-specific configurations */}
              {renderTypeSpecificFields()}
            </div>
          </div>
          
          <DrawerFooter>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveMeasurement} disabled={!isFormValid()}>
                {editingSubgoal ? 'Update' : 'Add'} Measurement
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Card>
  );
};
