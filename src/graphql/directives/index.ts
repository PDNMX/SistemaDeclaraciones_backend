import { HasRoleDirective, IsAuthenticatedDirective } from 'graphql-auth-directives';

class Directives {

  public static build(): Record<string, any> {
    return {
      isAuthenticated: IsAuthenticatedDirective,
      hasRole: HasRoleDirective,
    };
  }
}

export default Directives;
