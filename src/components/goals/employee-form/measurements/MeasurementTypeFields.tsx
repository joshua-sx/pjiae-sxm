
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { type Subgoal } from '../types';

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

export const MeasurementTypeFields: React.FC<MeasurementTypeFieldsProps> = ({
  type,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  measurementUnit,
  setMeasurementUnit,
  currencyCode,
  setCurrencyCode,
  operator,
  setOperator,
  amountValue,
  setAmountValue,
  targetPercentage,
  setTargetPercentage,
  optionA,
  setOptionA,
  optionB,
  setOptionB,
  positiveResult,
  setPositiveResult,
  trueScore,
  setTrueScore,
  falseScore,
  setFalseScore,
  dateMode,
  setDateMode,
  targetDate,
  setTargetDate,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  expression,
  setExpression
}) => {
  switch (type) {
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
            <Select value={operator} onValueChange={(value) => setOperator(value as '≥' | '≤' | '=' | 'range')}>
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
            <Select value={operator} onValueChange={(value) => setOperator(value as '≥' | '≤' | '=' | 'range')}>
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
            <Select value={positiveResult} onValueChange={(value) => setPositiveResult(value as 'A' | 'B')}>
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
            <Select value={dateMode} onValueChange={(value) => setDateMode(value as 'deadline' | 'range')}>
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
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {targetDate ? format(targetDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
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
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
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
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
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
