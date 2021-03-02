import { CatalogoSchema } from './catalogo';
import { MontoSchema } from './monto';
import { Schema } from 'mongoose';


const string_type = {
  type: String,
  trim: true,
  uppercase: true,
};

export const ActividadLaboralSectorPrivadoSchema = new Schema({
  nombreEmpresaSociedadAsociacion: string_type,
  empleoCargoComision: string_type,
  rfc: string_type,
  fechaIngreso: Date,
  sector: CatalogoSchema,
  salarioMensualNeto: MontoSchema,
  proveedorContratistaGobierno: Boolean,
});
