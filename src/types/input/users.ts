interface RFCInput {
  rfc: string
  homoClave: string
}

export interface UserProfileInput {
  nombre: string;
	primerApellido: string;
	segundoApellido?: string;
	curp: string;
  rfc: RFCInput;
}

export interface UserSignUpInput extends UserProfileInput {
  username: string;
  password: string;
}
