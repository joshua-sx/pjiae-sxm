
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGoalsQuery } from './useGoalsQuery';
import React from 'react';
import { toast } from '@/hooks/use-toast';

jest.mock('@/hooks/use-toast', () => ({
  toast: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useGoalsQuery', () => {
  it('should return goals data', async () => {
    const { result } = renderHook(() => useGoalsQuery(), {
      wrapper: createWrapper(),
    });

    // Initially in loading state
    expect(result.current.isLoading).toBe(true);

    // Wait for the query to resolve
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Check that data is returned and is an array
    expect(Array.isArray(result.current.data)).toBe(true);
    expect(result.current.data.length).toBeGreaterThan(0);
    
    // Check that each goal has the required properties
    result.current.data.forEach((goal) => {
      expect(goal).toHaveProperty('id');
      expect(goal).toHaveProperty('title');
      expect(goal).toHaveProperty('description');
      expect(goal).toHaveProperty('status');
      expect(goal).toHaveProperty('progress');
    });
  });

  it('should handle query errors and show a toast', async () => {
    const failingQuery = jest.fn(async () => {
      throw new Error('fail');
    });

    const { result } = renderHook(() => useGoalsQuery({ queryFn: failingQuery }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({
        description: 'Failed to fetch goals data',
        variant: 'destructive',
      })
    );
  });
});
