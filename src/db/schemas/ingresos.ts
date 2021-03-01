import { ActividadFinancieraTotalSchema } from './actividad_financiera_total';
import { ActividadIndustrialTotalSchema } from './actividad_industrial_total';
import { MontoSchema } from './monto';
import { OtrosIngresosTotalSchema } from './otros_ingresos_total';
import { Schema } from 'mongoose';
import { ServiciosProfesionalesTotalSchema } from './servicios_profesionales_total';


export const IngresosSchema = new Schema({
  remuneracionMensualCargoPublico: MontoSchema,
  otrosIngresosMensualesTotal: MontoSchema,
  actividadIndustrialComercialEmpresarial: ActividadIndustrialTotalSchema,
  actividadFinanciera: ActividadFinancieraTotalSchema,
  serviciosProfesionales: ServiciosProfesionalesTotalSchema,
  otrosIngresos: OtrosIngresosTotalSchema,
  ingresoMensualNetoDeclarante: MontoSchema,
  ingresoMensualNetoParejaDependiente: MontoSchema,
  totalIngresosMensualesNetos: MontoSchema,
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
