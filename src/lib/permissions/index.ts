
// Re-export all permission-related exports from a single entry point
export { UserRole, getRoleEnum } from './roles';
export type { Capability } from './capabilities';
export { rolePermissions } from './rolePermissions';
export { hasPermission } from './utils';
