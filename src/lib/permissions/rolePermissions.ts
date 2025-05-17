
import { UserRole } from './roles';
import { Capability } from './capabilities';

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
    
    // Appraisals
    'canSubmitSelfReview',
    'canModifyFinalAssessments',
    'canModifyMidYearReviews'
  ],
};
