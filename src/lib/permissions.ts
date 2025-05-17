export enum UserRole {
  HR_OFFICER = 'HR Officer',
  DIRECTOR = 'Director',
  SUPERVISOR = 'Supervisor',
  EMPLOYEE = 'Employee',
  IT_ADMIN = 'IT Admin',
}

export type Capability =
  // User Management
  | 'canManageUsers'
  | 'canAssignRoles'
  | 'canViewEmployeeDirectory'
  
  // Organization Structure
  | 'canManageDepartments'
  | 'canManageDivisions'
  | 'canViewDivisionStructure'
  | 'canViewDepartmentStructure'
  
  // Appraisal Cycles
  | 'canManageCycles'
  | 'canViewCycles'
  
  // Goals
  | 'canCreateGoal'
  | 'canApproveGoal'
  | 'canFlagGoals'
  | 'canEditTeamGoals'
  | 'canProposeGoal'
  | 'canManageDivisionGoals'
  | 'canViewDivisionGoals'
  
  // Appraisals
  | 'canSubmitSelfReview'
  | 'canModifyFinalAssessments'
  | 'canModifyMidYearReviews'
  | 'canOverseeAppraisals'
  | 'canAssignAppraisers'
  
  // Reports & Analytics
  | 'canViewReports'
  | 'canAccessHRDashboard'
  | 'canViewPendingForms'
  | 'canViewFlaggedItems'
  
  // System & Audit
  | 'canAccessAuditLogs'
  | 'canUploadDocs'
  | 'canAccessSystemHealth'
  | 'canManageBackups'
  | 'canManageSystemSettings';

export const rolePermissions: Record<UserRole, Capability[]> = {
  [UserRole.IT_ADMIN]: [
    // User Management
    'canManageUsers',
    'canAssignRoles',
    'canViewEmployeeDirectory',
    
    // Organization Structure
    'canManageDepartments',
    'canManageDivisions',
    'canViewDivisionStructure',
    'canViewDepartmentStructure',
    
    // Appraisal Cycles
    'canManageCycles',
    'canViewCycles',
    
    // Goals
    'canCreateGoal',
    'canApproveGoal',
    'canFlagGoals',
    'canEditTeamGoals',
    'canProposeGoal',
    'canManageDivisionGoals',
    
    // Appraisals
    'canSubmitSelfReview',
    'canModifyFinalAssessments',
    'canModifyMidYearReviews',
    'canOverseeAppraisals',
    'canAssignAppraisers',
    
    // Reports & Analytics
    'canViewReports',
    'canViewDivisionGoals',
    'canAccessHRDashboard',
    'canViewPendingForms',
    'canViewFlaggedItems',
    
    // System & Audit
    'canAccessAuditLogs',
    'canUploadDocs',
    'canAccessSystemHealth',
    'canManageBackups',
    'canManageSystemSettings'
  ],
  
  [UserRole.HR_OFFICER]: [
    // User Management
    'canManageUsers',
    'canAssignRoles',
    'canViewEmployeeDirectory',
    
    // Organization Structure
    'canViewDivisionStructure',
    'canViewDepartmentStructure',
    
    // Appraisal Cycles
    'canManageCycles',
    'canViewCycles',
    
    // Goals - removed canCreateGoal and canProposeGoal
    'canApproveGoal',
    'canFlagGoals',
    'canEditTeamGoals',
    'canManageDivisionGoals',
    
    // Appraisals
    'canSubmitSelfReview',
    'canModifyFinalAssessments',
    'canModifyMidYearReviews',
    'canOverseeAppraisals',
    'canAssignAppraisers',
    
    // Reports & Analytics
    'canViewReports',
    'canViewDivisionGoals',
    'canAccessHRDashboard',
    'canViewPendingForms',
    'canViewFlaggedItems',
    
    // System & Audit
    'canAccessAuditLogs',
    'canUploadDocs'
  ],
  
  [UserRole.DIRECTOR]: [
    // User Management
    'canViewEmployeeDirectory',
    
    // Organization Structure
    'canViewDivisionStructure',
    'canViewDepartmentStructure',
    
    // Appraisal Cycles
    'canViewCycles',
    
    // Goals
    'canCreateGoal',
    'canApproveGoal',
    'canFlagGoals',
    'canProposeGoal',
    
    // Appraisals
    'canSubmitSelfReview',
    'canOverseeAppraisals',
    
    // Reports & Analytics
    'canViewReports',
    'canViewDivisionGoals'
  ],
  
  [UserRole.SUPERVISOR]: [
    // User Management
    'canViewEmployeeDirectory',
    
    // Organization Structure
    'canViewDepartmentStructure',
    
    // Appraisal Cycles
    'canViewCycles',
    
    // Goals
    'canCreateGoal',
    'canEditTeamGoals',
    'canProposeGoal',
    
    // Appraisals
    'canSubmitSelfReview',
    'canModifyFinalAssessments',
    'canModifyMidYearReviews',
    
    // Reports & Analytics
    'canViewReports',
    'canViewDivisionGoals'
  ],
  
  [UserRole.EMPLOYEE]: [
    // Appraisal Cycles
    'canViewCycles',
    
    // Goals
    'canProposeGoal',
    
    // Appraisals
    'canSubmitSelfReview',
    'canModifyFinalAssessments',
    'canModifyMidYearReviews'
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
