import { applySort } from './employeeFilters';
import { UserRole } from '@/lib/permissions';
import type { Employee } from '@/types/employee';

describe('applySort', () => {
  it('returns 0 when values are equal and maintains original order', () => {
    const emp1: Employee & { score: number } = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: UserRole.EMPLOYEE,
      departmentId: 'd1',
      departmentName: 'Dept',
      divisionId: 'div',
      divisionName: 'Div',
      status: 'Active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      score: 10,
    };

    const emp2: Employee & { score: number } = {
      ...emp1,
      id: '2',
      email: 'jane@example.com',
    };

    const sorted = applySort([emp1, emp2], 'score' as any, 'asc');
    expect(sorted[0]).toBe(emp1);
    expect(sorted[1]).toBe(emp2);
  });
});
