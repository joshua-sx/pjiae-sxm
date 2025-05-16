
import React from 'react';
import { TableHead } from "@/components/ui/table";
import { ArrowUpAZ, ArrowDownAZ } from "lucide-react";
import { SortColumn, SortDirection } from '@/hooks/useDivisionGoals';
import { cn } from "@/lib/utils";

interface SortableTableHeaderProps {
  column: SortColumn;
  label: string;
  currentSortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
  className?: string;
}

const SortableTableHeader = ({
  column,
  label,
  currentSortColumn,
  sortDirection,
  onSort,
  className
}: SortableTableHeaderProps) => {
  const renderSortIcon = () => {
    if (currentSortColumn !== column) return null;
    
    return sortDirection === 'asc' 
      ? <ArrowUpAZ className="ml-1 h-5 w-5 inline text-primary" />
      : <ArrowDownAZ className="ml-1 h-5 w-5 inline text-primary" />;
  };

  const getSortableHeaderProps = () => ({
    onClick: () => onSort(column),
    className: cn(
      "cursor-pointer hover:bg-muted/50 transition-colors relative group px-5 font-semibold",
      className
    )
  });

  return (
    <TableHead {...getSortableHeaderProps()}>
      {label}
      {renderSortIcon()}
      {!renderSortIcon() && (
        <span className="text-muted-foreground/30 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpAZ className="h-4 w-4" />
        </span>
      )}
    </TableHead>
  );
};

export default SortableTableHeader;
