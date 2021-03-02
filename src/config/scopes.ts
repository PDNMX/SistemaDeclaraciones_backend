import { Role } from '../types';

export class Scopes {
  private static scopesByRole: Record<Role, string[]> = {
    [Role.USER]: ['DeclarationMetada:read:mine', 'Stats:read:mine', 'UserProfile:read:mine'],
    [Role.ADMIN]: ['DeclarationMetada:read:all', 'Stats:read:all', 'UserProfile:read:all'],
    [Role.SUPER_ADMIN]: ['DeclarationMetada:read:all', 'Stats:read:all', 'UserProfile:read:all'],
    [Role.ROOT]: ['DeclarationMetada:read:all', 'Stats:read:all', 'UserProfile:read:all'],
  };

  public static createByRoles(roles: Role[]): string[] {
    let scopes: string[] = [];
    roles.forEach(role => {
      scopes = scopes.concat(Scopes.scopesByRole[role]);
    });

    return [...new Set(scopes)];
  }
}
