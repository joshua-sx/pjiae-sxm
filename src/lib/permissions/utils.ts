
import { UserRole } from './roles';
import { Capability } from './capabilities';
import { rolePermissions } from './rolePermissions';

export function hasPermission(
  role: UserRole,
  capability: Capability
): boolean {
  return rolePermissions[role]?.includes(capability) ?? false;
}
