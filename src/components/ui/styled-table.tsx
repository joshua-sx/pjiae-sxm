
import React from 'react';
import {
  Table as UITable,
  TableHeader as UITableHeader,
  TableBody as UITableBody,
  TableHead as UITableHead,
  TableRow as UITableRow,
  TableCell as UITableCell,
  TableCaption as UITableCaption,
  TableFooter as UITableFooter,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Wrapper components with consistent styling

export const Table: React.FC<React.ComponentPropsWithoutRef<typeof UITable>> = ({
  className,
  ...props
}) => (
  <div className="w-full overflow-auto rounded-md border bg-white shadow-sm">
    <UITable className={cn("w-full", className)} {...props} />
  </div>
);

export const TableHeader: React.FC<React.ComponentPropsWithoutRef<typeof UITableHeader>> = ({
  className,
  ...props
}) => (
  <UITableHeader className={cn("bg-muted/20 sticky top-0", className)} {...props} />
);

export const TableRow: React.FC<React.ComponentPropsWithoutRef<typeof UITableRow>> = ({
  className,
  ...props
}) => (
  <UITableRow 
    className={cn("border-b transition-colors hover:bg-muted/30", className)} 
    {...props} 
  />
);

export const TableHead: React.FC<React.ComponentPropsWithoutRef<typeof UITableHead>> = ({
  className,
  ...props
}) => (
  <UITableHead 
    className={cn("h-11 px-4 text-left font-semibold text-muted-foreground", className)} 
    {...props} 
  />
);

export const TableBody: React.FC<React.ComponentPropsWithoutRef<typeof UITableBody>> = ({
  className,
  ...props
}) => (
  <UITableBody className={cn("[&_tr:last-child]:border-0 bg-white", className)} {...props} />
);

export const TableCell: React.FC<React.ComponentPropsWithoutRef<typeof UITableCell>> = ({
  className,
  ...props
}) => (
  <UITableCell className={cn("p-4", className)} {...props} />
);

export const TableCaption: React.FC<React.ComponentPropsWithoutRef<typeof UITableCaption>> = ({
  className,
  ...props
}) => (
  <UITableCaption className={cn("mt-2 text-sm text-muted-foreground", className)} {...props} />
);

export const TableFooter: React.FC<React.ComponentPropsWithoutRef<typeof UITableFooter>> = ({
  className,
  ...props
}) => (
  <UITableFooter className={cn("bg-muted/10 border-t", className)} {...props} />
);

export const EmptyTableRow: React.FC<{ colSpan: number; message?: string }> = ({ 
  colSpan, 
  message = "No data available" 
}) => (
  <TableRow>
    <TableCell colSpan={colSpan} className="h-24 text-center text-muted-foreground">
      {message}
    </TableCell>
  </TableRow>
);

export { Table as StyledTable };
