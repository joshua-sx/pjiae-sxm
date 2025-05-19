
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BinaryTypeFieldsProps {
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
}

export const BinaryTypeFields: React.FC<BinaryTypeFieldsProps> = ({
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
}) => {
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
};
