export interface UserProfileInput {
  nombre: string;
	primerApellido: string;
	segundoApellido?: string;
	curp: string;
  rfc: string;
}

export interface UserSignUpInput extends UserProfileInput {
  username: string;
  password: string;
}
