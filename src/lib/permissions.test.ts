
import { UserRole, rolePermissions, hasPermission } from './permissions';

describe('Permissions Module', () => {
  describe('Role Permissions', () => {
    it('HR Officer should have all HR capabilities', () => {
      expect(hasPermission(UserRole.HR_OFFICER, 'canManageUsers')).toBe(true);
      expect(hasPermission(UserRole.HR_OFFICER, 'canFlagGoals')).toBe(true);
      expect(hasPermission(UserRole.HR_OFFICER, 'canAccessHRDashboard')).toBe(true);
      expect(hasPermission(UserRole.HR_OFFICER, 'canUploadDocs')).toBe(true);
      expect(hasPermission(UserRole.HR_OFFICER, 'canAssignRoles')).toBe(true);
    });

    it('Employee should NOT have management capabilities', () => {
      expect(hasPermission(UserRole.EMPLOYEE, 'canManageUsers')).toBe(false);
      expect(hasPermission(UserRole.EMPLOYEE, 'canApproveGoal')).toBe(false);
      expect(hasPermission(UserRole.EMPLOYEE, 'canAccessAuditLogs')).toBe(false);
    });

    it('Employee should be able to propose goals and submit self reviews', () => {
      expect(hasPermission(UserRole.EMPLOYEE, 'canProposeGoal')).toBe(true);
      expect(hasPermission(UserRole.EMPLOYEE, 'canSubmitSelfReview')).toBe(true);
    });

    it('Supervisor should be able to create goals and view reports', () => {
      expect(hasPermission(UserRole.SUPERVISOR, 'canCreateGoal')).toBe(true);
      expect(hasPermission(UserRole.SUPERVISOR, 'canViewReports')).toBe(true);
    });

    it('IT Admin should be able to manage users and system health', () => {
      expect(hasPermission(UserRole.IT_ADMIN, 'canManageUsers')).toBe(true);
      expect(hasPermission(UserRole.IT_ADMIN, 'canAccessSystemHealth')).toBe(true);
      expect(hasPermission(UserRole.IT_ADMIN, 'canManageBackups')).toBe(true);
    });

    it('Director should be able to approve goals and oversee appraisals', () => {
      expect(hasPermission(UserRole.DIRECTOR, 'canApproveGoal')).toBe(true);
      expect(hasPermission(UserRole.DIRECTOR, 'canViewReports')).toBe(true);
      expect(hasPermission(UserRole.DIRECTOR, 'canOverseeAppraisals')).toBe(true);
    });
  });

  describe('Permission Edge Cases', () => {
    it('should return false for undefined capabilities', () => {
      // @ts-expect-error Testing runtime behavior with invalid input
      expect(hasPermission(UserRole.HR_OFFICER, 'nonExistentCapability')).toBe(false);
    });
  });
});
