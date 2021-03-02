import { Role } from '../enums';

export interface Context {
  user: {
    id: string;
    roles: Role[];
    scopes: string[];
  };
}
