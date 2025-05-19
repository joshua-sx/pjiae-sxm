
import React from 'react';
import { type Subgoal } from '../types';
import {
  NumberTypeFields,
  CurrencyTypeFields,
  PercentageTypeFields,
  BinaryTypeFields,
  DateTypeFields,
  CustomTypeFields
} from './type-fields';

interface MeasurementTypeFieldsProps {
  type: Subgoal['type'];
  minValue: string;
  setMinValue: (value: string) => void;
  maxValue: string;
  setMaxValue: (value: string) => void;
  measurementUnit: string;
  setMeasurementUnit: (value: string) => void;
  currencyCode: string;
  setCurrencyCode: (value: string) => void;
  operator: '≥' | '≤' | '=' | 'range';
  setOperator: (value: '≥' | '≤' | '=' | 'range') => void;
  amountValue: string;
  setAmountValue: (value: string) => void;
  targetPercentage: string;
  setTargetPercentage: (value: string) => void;
  optionA: string;
  setOptionA: (value: string) => void;
  optionB: string;
  setOptionB: (value: string) => void;
  positiveResult: 'A' | 'B';
  setPositiveResult: (value: 'A' | 'B') => void;
  trueScore: string;
  setTrueScore: (value: string) => void;
  falseScore: string;
  setFalseScore: (value: string) => void;
  dateMode: 'deadline' | 'range';
  setDateMode: (value: 'deadline' | 'range') => void;
  targetDate: Date | undefined;
  setTargetDate: (date: Date | undefined) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  expression: string;
  setExpression: (value: string) => void;
}

export const MeasurementTypeFields: React.FC<MeasurementTypeFieldsProps> = (props) => {
  const { type } = props;

  switch (type) {
    case 'number':
      return (
        <NumberTypeFields
          minValue={props.minValue}
          setMinValue={props.setMinValue}
          maxValue={props.maxValue}
          setMaxValue={props.setMaxValue}
          measurementUnit={props.measurementUnit}
          setMeasurementUnit={props.setMeasurementUnit}
        />
      );
    
    case 'currency':
      return (
        <CurrencyTypeFields
          currencyCode={props.currencyCode}
          setCurrencyCode={props.setCurrencyCode}
          operator={props.operator}
          setOperator={props.setOperator}
          minValue={props.minValue}
          setMinValue={props.setMinValue}
          maxValue={props.maxValue}
          setMaxValue={props.setMaxValue}
          amountValue={props.amountValue}
          setAmountValue={props.setAmountValue}
        />
      );
    
    case 'percentage':
      return (
        <PercentageTypeFields
          operator={props.operator}
          setOperator={props.setOperator}
          targetPercentage={props.targetPercentage}
          setTargetPercentage={props.setTargetPercentage}
        />
      );
    
    case 'binary':
      return (
        <BinaryTypeFields
          optionA={props.optionA}
          setOptionA={props.setOptionA}
          optionB={props.optionB}
          setOptionB={props.setOptionB}
          positiveResult={props.positiveResult}
          setPositiveResult={props.setPositiveResult}
          trueScore={props.trueScore}
          setTrueScore={props.setTrueScore}
          falseScore={props.falseScore}
          setFalseScore={props.setFalseScore}
        />
      );
    
    case 'date':
      return (
        <DateTypeFields
          dateMode={props.dateMode}
          setDateMode={props.setDateMode}
          targetDate={props.targetDate}
          setTargetDate={props.setTargetDate}
          startDate={props.startDate}
          setStartDate={props.setStartDate}
          endDate={props.endDate}
          setEndDate={props.setEndDate}
        />
      );
    
    case 'custom':
      return (
        <CustomTypeFields
          expression={props.expression}
          setExpression={props.setExpression}
        />
      );
    
    default:
      return null;
  }
};
