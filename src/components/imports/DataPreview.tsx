
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface DataPreviewProps {
  data: any[];
  mappedFields: Record<string, string>;
}

export const DataPreview = ({ data, mappedFields }: DataPreviewProps) => {
  // Filter to only include mapped fields
  const activeMappedFields = Object.entries(mappedFields)
    .filter(([_, mapped]) => !!mapped);
  
  if (data.length === 0) {
    return (
      <div className="text-center p-8 border rounded-md">
        <p className="text-muted-foreground">No data to preview</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Data Preview</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This is how your data will look in the system. We're showing the first {Math.min(data.length, 10)} of {data.length} rows.
      </p>
      
      <div className="border rounded-md overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-2 py-1">#</TableHead>
              {activeMappedFields.map(([original, mapped]) => (
                <TableHead key={original} className="whitespace-nowrap px-2 py-1">
                  {mapped}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell className="px-2 py-1 text-muted-foreground">{rowIndex + 1}</TableCell>
                {activeMappedFields.map(([original, _]) => (
                  <TableCell key={original} className="truncate max-w-[200px] px-2 py-1">
                    {row[original]?.toString() || ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {data.length > 10 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing 10 of {data.length} rows
        </div>
      )}
    </div>
  );
};
