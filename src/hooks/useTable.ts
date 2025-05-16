
import { useState, useMemo } from 'react';

export function useTable<T extends Record<string, any>>(
  items: T[],
  defaultSortKey: keyof T,
  defaultDirection: 'asc' | 'desc' = 'asc',
  pageSize = 10
) {
  const [sortKey, setSortKey] = useState<keyof T>(defaultSortKey);
  const [direction, setDirection] = useState<'asc' | 'desc'>(defaultDirection);
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    const sortedItems = [...items].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      
      // Handle null or undefined values
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return direction === 'asc' ? -1 : 1;
      if (bVal == null) return direction === 'asc' ? 1 : -1;
      
      // Handle different value types
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return direction === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }
      
      // Handle numbers, dates, and other comparable types
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    return sortedItems;
  }, [items, sortKey, direction]);

  const paged = useMemo(
    () => sorted.slice((page - 1) * pageSize, page * pageSize),
    [sorted, page, pageSize]
  );

  const pageCount = Math.ceil(items.length / pageSize);

  function handleSort(key: keyof T) {
    if (key === sortKey) {
      setDirection(dir => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setDirection('asc');
    }
  }

  return {
    data: paged,
    sortColumn: sortKey,
    sortDirection: direction,
    onSort: handleSort,
    page,
    setPage,
    pageCount,
    totalCount: items.length,
  };
}
