import { ActividadFinancieraTotalSchema } from './actividad_financiera_total';
import { ActividadIndustrialTotalSchema } from './actividad_industrial_total';
import { EnajenacionBienesTotalSchema } from './enajenacion_bienes_total';
import { MontoSchema } from './monto';
import { OtrosIngresosTotalSchema } from './otros_ingresos_total';
import { Schema } from 'mongoose';
import { ServiciosProfesionalesTotalSchema } from './servicios_profesionales_total';


export const ActividadAnualAnteriorSchema = new Schema({
  servidorPublicoAnioAnterior: Boolean,
  fechaIngreso: Date,
  fechaConclusion: Date,
  remuneracionNetaCargoPublico: MontoSchema,
  otrosIngresosTotal: MontoSchema,
  actividadIndustrialComercialEmpresarial: ActividadIndustrialTotalSchema,
  actividadFinanciera: ActividadFinancieraTotalSchema,
  serviciosProfesionales: ServiciosProfesionalesTotalSchema,
  enajenacionBienes: EnajenacionBienesTotalSchema,
  otrosIngresos: OtrosIngresosTotalSchema,
  ingresoNetoAnualDeclarante: MontoSchema,
  ingresoNetoAnualParejaDependiente: MontoSchema,
  totalIngresosNetosAnuales: MontoSchema,
  aclaracionesObservaciones: {
    type: String,
    trim: true,
  },
});
