
import { type Subgoal } from '../../types';

export function validateMeasurementForm({
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
}: {
  measurementName: string;
  measurementWeight: string;
  measurementType: Subgoal['type'];
  minValue: string;
  maxValue: string;
  amountValue: string;
  targetPercentage: string;
  optionA: string;
  optionB: string;
  targetDate?: Date;
  startDate?: Date;
  endDate?: Date;
  dateMode: 'deadline' | 'range';
  expression: string;
}): boolean {
  if (!measurementName.trim()) return false;
    
  const weight = parseFloat(measurementWeight);
  if (isNaN(weight) || weight <= 0 || weight > 100) return false;
  
  // Check type-specific validations
  switch(measurementType) {
    case 'number':
      return !isNaN(parseFloat(minValue)) && !isNaN(parseFloat(maxValue));
    case 'currency':
      return !isNaN(parseFloat(amountValue)) || 
        (!isNaN(parseFloat(minValue)) && !isNaN(parseFloat(maxValue)));
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
}
