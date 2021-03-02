import { Role } from '../enums';

export interface UserES {
  _id: string;
  username: string,
  nombre: string;
  primerApellido: string;
  segundoApellido?: string;
  curp: string;
  rfc: string;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  username: string;
  nombre: string;
	primerApellido: string;
	segundoApellido?: string;
	curp: string;
  rfc: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
  resetToken: {
    salt?: string;
    expiration?: number;
  }
}

export interface Login {
  user: User;
  jwtToken: string;
}
