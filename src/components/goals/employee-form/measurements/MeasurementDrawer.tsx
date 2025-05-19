import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { type Subgoal } from '../types';
import { Calendar as CalendarIcon, DollarSign, Hash, Percent, ToggleRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { MeasurementTypeFields } from './MeasurementTypeFields';

interface MeasurementDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  subgoal: Subgoal | null;
  onAddSubgoal: (subgoal: Subgoal) => void;
  onUpdateSubgoals: (subgoals: Subgoal[]) => void;
  existingSubgoals: Subgoal[];
  remainingWeight: number;
}

export const MeasurementDrawer: React.FC<MeasurementDrawerProps> = ({
  isOpen,
  onOpenChange,
  subgoal,
  onAddSubgoal,
  onUpdateSubgoals,
  existingSubgoals,
  remainingWeight
}) => {
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

  useEffect(() => {
    if (isOpen) {
      if (subgoal) {
        // Editing existing subgoal
        populateFormFromSubgoal(subgoal);
      } else {
        // Creating new subgoal
        resetFormFields();
      }
    }
  }, [isOpen, subgoal, remainingWeight]);

  const populateFormFromSubgoal = (subgoal: Subgoal) => {
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
    
    if (subgoal) {
      // Update existing subgoal
      const updatedSubgoals = existingSubgoals.map(sg => 
        sg.id === subgoal.id ? {
          ...sg,
          name: measurementName,
          type: measurementType,
          unit: unit,
          weight: weight,
          config: config
        } : sg
      );
      onUpdateSubgoals(updatedSubgoals);
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
    
    onOpenChange(false);
  };

  // Render type icon with tooltip descriptions
  const renderTypeIcon = (type: Subgoal['type']) => {
    switch (type) {
      case 'binary':
        return <ToggleRight className="h-4 w-4 text-green-500" />;
      case 'percentage':
        return <Percent className="h-4 w-4 text-purple-500" />;
      case 'currency':
        return <DollarSign className="h-4 w-4 text-amber-500" />;
      case 'number':
        return <Hash className="h-4 w-4 text-slate-500" />;  
      case 'date':
        return <CalendarIcon className="h-4 w-4 text-blue-500" />;
      case 'custom':
        return <Hash className="h-4 w-4 text-slate-500" />;
      default:
        return null;
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="px-4 max-h-[85vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>{subgoal ? 'Edit Measurement' : 'Add Measurement'}</DrawerTitle>
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
              <Select 
                value={measurementType} 
                onValueChange={(value) => setMeasurementType(value as Subgoal['type'])}
              >
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
                      <DollarSign className="h-4 w-4 text-amber-500" />
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
                      <CalendarIcon className="h-4 w-4 text-blue-500" />
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
            <MeasurementTypeFields 
              type={measurementType}
              minValue={minValue}
              setMinValue={setMinValue}
              maxValue={maxValue}
              setMaxValue={setMaxValue}
              measurementUnit={measurementUnit}
              setMeasurementUnit={setMeasurementUnit}
              currencyCode={currencyCode}
              setCurrencyCode={setCurrencyCode}
              operator={operator}
              setOperator={setOperator}
              amountValue={amountValue}
              setAmountValue={setAmountValue}
              targetPercentage={targetPercentage}
              setTargetPercentage={setTargetPercentage}
              optionA={optionA}
              setOptionA={setOptionA}
              optionB={optionB}
              setOptionB={setOptionB}
              positiveResult={positiveResult}
              setPositiveResult={setPositiveResult}
              trueScore={trueScore}
              setTrueScore={setTrueScore}
              falseScore={falseScore}
              setFalseScore={setFalseScore}
              dateMode={dateMode}
              setDateMode={setDateMode}
              targetDate={targetDate}
              setTargetDate={setTargetDate}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              expression={expression}
              setExpression={setExpression}
            />
          </div>
        </div>
        
        <DrawerFooter>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSaveMeasurement} disabled={!isFormValid()}>
              {subgoal ? 'Update' : 'Add'} Measurement
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
