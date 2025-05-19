
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { type Subgoal } from '../types';
import { MeasurementTypeFields } from './MeasurementTypeFields';
import {
  MeasurementFormHeader,
  MeasurementBasicFields,
  MeasurementFormActions,
  validateMeasurementForm
} from './inline-form';

interface InlineMeasurementFormProps {
  subgoal: Subgoal | null;
  onAddSubgoal: (subgoal: Subgoal) => void;
  onUpdateSubgoals: (subgoals: Subgoal[]) => void;
  existingSubgoals: Subgoal[];
  remainingWeight: number;
  onCancel: () => void;
}

export const InlineMeasurementForm: React.FC<InlineMeasurementFormProps> = ({
  subgoal,
  onAddSubgoal,
  onUpdateSubgoals,
  existingSubgoals,
  remainingWeight,
  onCancel
}) => {
  // Form state for new or editing measurement
  const [measurementName, setMeasurementName] = useState('');
  const [measurementType, setMeasurementType] = useState<Subgoal['type']>('number');
  const [measurementUnit, setMeasurementUnit] = useState('');
  const [measurementWeight, setMeasurementWeight] = useState('1');
  
  // Type-specific form states
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
    if (subgoal) {
      // Editing existing subgoal
      populateFormFromSubgoal(subgoal);
    } else {
      // Creating new subgoal
      resetFormFields();
    }
  }, [subgoal, remainingWeight]);

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
    
    onCancel();
  };

  const isFormValid = () => {
    return validateMeasurementForm({
      measurementName,
      measurementWeight,
      measurementType,
      minValue,
      maxValue,
      amountValue,
      targetPercentage,
      optionA,
      optionB,
      targetDate,
      startDate,
      endDate,
      dateMode,
      expression
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <MeasurementFormHeader 
          title={subgoal ? 'Edit Measurement' : 'Add Measurement'}
          onCancel={onCancel}
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <MeasurementBasicFields 
            measurementName={measurementName}
            setMeasurementName={setMeasurementName}
            measurementType={measurementType}
            setMeasurementType={setMeasurementType}
            measurementWeight={measurementWeight}
            setMeasurementWeight={setMeasurementWeight}
          />
          
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
      </CardContent>
      <CardFooter>
        <MeasurementFormActions 
          isValid={isFormValid()}
          isEditing={!!subgoal}
          onCancel={onCancel}
          onSave={handleSaveMeasurement}
        />
      </CardFooter>
    </Card>
  );
};
