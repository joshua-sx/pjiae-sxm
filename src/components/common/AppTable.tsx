
import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;      // tailwind width class, e.g. 'w-1/4'
  render?: (item: T) => React.ReactNode;
}

interface AppTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  sortColumn?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: keyof T) => void;
  onPageChange?: (page: number) => void;
  pageCount?: number;
  currentPage?: number;
  emptyMessage?: string;
}

export function AppTable<T extends { id: string }>({
  columns,
  data,
  isLoading,
  isError,
  errorMessage = "An error occurred while loading data.",
  sortColumn,
  sortDirection,
  onSort,
  onPageChange,
  pageCount,
  currentPage = 1,
  emptyMessage = "No records found."
}: AppTableProps<T>) {
  return (
    <Card className="w-full">
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 text-center">
            <div className="flex justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
          </div>
        ) : isError ? (
          <div className="p-6 text-center text-destructive">
            <p>{errorMessage}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">{emptyMessage}</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/20 sticky top-0">
                <TableRow>
                  {columns.map(col => (
                    <TableHead
                      key={String(col.key)}
                      className={`px-4 py-2 text-left font-semibold ${col.width || ''} ${
                        col.sortable ? 'cursor-pointer select-none hover:bg-muted/50 transition-colors' : ''
                      }`}
                      onClick={() => col.sortable && onSort?.(col.key)}
                      aria-sort={col.sortable && sortColumn === col.key ? 
                        (sortDirection === 'asc' ? 'ascending' : 'descending') : 
                        undefined}
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        {col.sortable && sortColumn === col.key && (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {data.map(row => (
                  <TableRow key={row.id} className="hover:bg-muted/30 border-b transition-colors">
                    {columns.map(col => (
                      <TableCell key={String(col.key)} className="px-4 py-2">
                        {col.render ? col.render(row) : String(row[col.key] ?? '')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
              {pageCount != null && pageCount > 1 && onPageChange && (
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <div className="flex justify-end space-x-2 p-4">
                        {[...Array(pageCount)].map((_, i) => (
                          <Button
                            key={i}
                            size="sm"
                            variant={currentPage === i + 1 ? "default" : "outline"}
                            onClick={() => onPageChange(i + 1)}
                          >
                            {i + 1}
                          </Button>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
