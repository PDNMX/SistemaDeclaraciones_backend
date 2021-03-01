import { Role } from '../enums';

export interface User {
  username: string;
  nombre: string;
	primerApellido: string;
	segundoApellido?: string;
	curp: string;
  rfc: {
    rfc: string;
    homoClave: string;
  }
  roles: Role[];
  createAt: Date;
  updatedAt: Date;
  resetToken: {
    salt?: string;
    exp?: number;
  }
}

export interface Login {
  user: User;
  jwtToken: string;
}
