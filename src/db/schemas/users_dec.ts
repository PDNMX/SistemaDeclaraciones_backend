import { Schema } from 'mongoose';

const options = {
  collection: 'users_dec',
  timestamps: { createdAt: 'createdAt' }
};

export const UserDecSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    declaraciones: {
      type: Schema.Types.ObjectId,
      ref: 'Declaracion',
      required: true,
      index: true
    },
    ente_publico: { type: String, required: true },
    lugar: { type: String, required: true },
    servidor_publico_recibe: {
      nombre: { type: String, required: true },
      cargo: { type: String, required: true }
    },
    acuse: {
      tipo_declaracion: { type: String, required: true },
      texto1_cuerpo_acuse: { type: String, required: true },
      texto2_cuerpo_acuse: { type: String, required: true }
    },
    declaracion: {
      subtitulo: { type: String, required: true },
      tipo_declaracion: { type: String, required: true },
      texto_declaratoria: { type: String, required: true }
    }
  },
  options
);
