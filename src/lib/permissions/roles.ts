
export enum UserRole {
  HR_OFFICER = 'HR Officer',
  DIRECTOR = 'Director',
  SUPERVISOR = 'Supervisor',
  EMPLOYEE = 'Employee',
  IT_ADMIN = 'IT Admin',
}

// Convert string role to enum (for backward compatibility)
export function getRoleEnum(roleString: string): UserRole {
  const role = Object.values(UserRole).find(r => r === roleString);
  if (!role) {
    throw new Error(`Invalid role: ${roleString}`);
  }
  return role;
}
