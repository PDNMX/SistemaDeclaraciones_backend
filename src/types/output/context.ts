import { Role } from '../enums';

export interface Context {
  user: {
    id: string;
    roles: Role[];
    scopes: string[];
  };
}

export interface JWTConfig {
  secret: string;
  expiresIn: string;
}
