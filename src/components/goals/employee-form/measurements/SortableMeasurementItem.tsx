
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { type Subgoal } from '../types';
import { Edit, Trash2, GripVertical, ChevronDown, ChevronUp, ToggleRight, Percent, Hash, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';

interface SortableMeasurementItemProps {
  subgoal: Subgoal;
  onEdit: () => void;
  onDelete: () => void;
}

export const SortableMeasurementItem: React.FC<SortableMeasurementItemProps> = ({
  subgoal,
  onEdit,
  onDelete
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: subgoal.id });
  
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
        return <Hash className="h-4 w-4 text-amber-500" />;
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
