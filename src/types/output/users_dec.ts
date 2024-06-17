export interface UserDec {
  owner: string;
  declaraciones: string;
  ente_publico: string;
  lugar: string;
  servidor_publico_recibe: {
    nombre: string;
    cargo: string;
  };
  acuse: {
    tipo_declaracion: string;
    texto1_cuerpo_acuse: string;
    texto2_cuerpo_acuse: string;
  };
  declaracion: {
    subtitulo: string;
    tipo_declaracion: string;
    texto_declaratoria: string;
  };
}
