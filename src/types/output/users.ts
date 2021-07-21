import { Role } from '../enums';

export interface UserES {
  _id: string;
  username: string,
  nombre: string;
  primerApellido: string;
  segundoApellido?: string;
  institucion?: {
    clave: string;
    valor: string;
  };
  curp: string;
  rfc: string;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
}

export interface RefreshToken {
  salt?: string;
  expiration?: number;
}

export interface User {
  username: string;
  nombre: string;
	primerApellido: string;
	segundoApellido?: string;
  institucion?: {
    clave: string;
    valor: string;
  };
	curp: string;
  rfc: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
  refreshJwtToken: RefreshToken;
  resetToken: RefreshToken;
}

export interface Login {
  user: User;
  jwtToken: string;
  refreshJwtToken: string;
}
