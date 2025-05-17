
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
