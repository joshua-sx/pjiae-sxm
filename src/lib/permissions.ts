
export enum UserRole {
  HR_OFFICER = 'HR Officer',
  DIRECTOR = 'Director',
  SUPERVISOR = 'Supervisor', // This seems to be used instead of MANAGER in the codebase
  EMPLOYEE = 'Employee',
  IT_ADMIN = 'IT Admin',
}

export type Capability =
  | 'canCreateGoal'
  | 'canApproveGoal'
  | 'canFlagGoals'
  | 'canViewReports'
  | 'canViewDivisionGoals'
  | 'canAccessAuditLogs'
  | 'canManageUsers'
  | 'canAssignAppraisers'
  | 'canManageCycles'
  | 'canAccessSystemHealth'
  | 'canManageBackups'
  | 'canModifyFinalAssessments'
  | 'canModifyMidYearReviews'
  | 'canViewPendingForms'
  | 'canViewFlaggedItems'
  | 'canAccessHRDashboard';

export const rolePermissions: Record<UserRole, Capability[]> = {
  [UserRole.HR_OFFICER]: [
    'canCreateGoal',
    'canApproveGoal',
    'canFlagGoals',
    'canViewReports',
    'canViewDivisionGoals',
    'canAccessAuditLogs',
    'canManageUsers',
    'canAssignAppraisers',
    'canManageCycles',
    'canModifyFinalAssessments',
    'canModifyMidYearReviews',
    'canViewPendingForms',
    'canViewFlaggedItems',
    'canAccessHRDashboard'
  ],
  [UserRole.DIRECTOR]: [
    'canCreateGoal',
    'canApproveGoal',
    'canViewReports',
    'canViewDivisionGoals'
  ],
  [UserRole.SUPERVISOR]: [
    'canCreateGoal',
    'canViewReports',
    'canViewDivisionGoals',
    'canModifyFinalAssessments',
    'canModifyMidYearReviews'
  ],
  [UserRole.EMPLOYEE]: [
    'canModifyFinalAssessments',
    'canModifyMidYearReviews'
  ],
  [UserRole.IT_ADMIN]: [
    'canManageUsers',
    'canViewReports',
    'canAccessAuditLogs',
    'canAccessSystemHealth',
    'canManageBackups'
  ],
};

export function hasPermission(
  role: UserRole,
  capability: Capability
): boolean {
  return rolePermissions[role]?.includes(capability) ?? false;
}

// Convert string role to enum (for backward compatibility)
export function getRoleEnum(roleString: string): UserRole {
  const role = Object.values(UserRole).find(r => r === roleString);
  if (!role) {
    throw new Error(`Invalid role: ${roleString}`);
  }
  return role;
}
