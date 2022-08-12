import { ActividadAnualAnteriorSchema } from './actividad_anual_anterior';
import { AdeudosPasivosSchema } from './adeudos_pasivos';
import { ApoyosSchema } from './apoyos';
import { BeneficiosPrivadosSchema } from './beneficios_privados';
import { BienesInmueblesSchema } from './bienes_inmuebles';
import { BienesMueblesSchema } from './bienes_muebles';
import { ClientesPrincipalesSchema } from './clientes_principales';
import { DatosCurricularesDeclaranteSchema } from './datos_curriculares_declarante';
import { DatosDependientesEconomicosSchema } from './datos_dependientes_economicos';
import { DatosEmpleoCargoComisionSchema } from './datos_empleo_cargos_comision';
import { DatosGeneralesSchema } from './datos_generales';
import { DatosParejaSchema } from './datos_pareja';
import { DomicilioDeclaranteSchema } from './domicilio_declarante';
import { ExperienciaLaboralSchema } from './experiencia_laboral';
import { FideicomisosSchema } from './fideicomisos';
import { IngresosSchema } from './ingresos';
import { InversionesCuentasValoresSchema } from './inversiones_cuentas_valores';
import { ParticipacionTomaDecisionesSchema } from './participacion_toma_decisiones';
import { ParticipacionesSchema } from './participaciones';
import { PrestamoComodatoSchema } from './prestamo_comodato';
import { RepresentacionesSchema } from './representaciones';
import { Schema } from 'mongoose';
import { TipoDeclaracion } from '../../types/enums';
import { VehiculosSchema } from './vehiculos';


const options = {
  collection: 'declaraciones',
  timestamps: { createdAt: 'createdAt',  updatedAt: 'updatedAt'}
};

export const DeclaracionSchema = new Schema({
  anioEjercicio: {
    type: Number,
    required: false,
  },
  datosGenerales: DatosGeneralesSchema,
  domicilioDeclarante: DomicilioDeclaranteSchema,
  datosCurricularesDeclarante: DatosCurricularesDeclaranteSchema,
  datosEmpleoCargoComision: DatosEmpleoCargoComisionSchema,
  experienciaLaboral: ExperienciaLaboralSchema,
  datosPareja: DatosParejaSchema,
  datosDependientesEconomicos: DatosDependientesEconomicosSchema,
  ingresos: IngresosSchema,
  actividadAnualAnterior: ActividadAnualAnteriorSchema,
  bienesInmuebles: BienesInmueblesSchema,
  vehiculos: VehiculosSchema,
  bienesMuebles: BienesMueblesSchema,
  inversionesCuentasValores: InversionesCuentasValoresSchema,
  adeudosPasivos: AdeudosPasivosSchema,
  prestamoComodato: PrestamoComodatoSchema,
  participacion: ParticipacionesSchema,
  participacionTomaDecisiones: ParticipacionTomaDecisionesSchema,
  apoyos: ApoyosSchema,
  representaciones: RepresentacionesSchema,
  clientesPrincipales: ClientesPrincipalesSchema,
  beneficiosPrivados: BeneficiosPrivadosSchema,
  fideicomisos: FideicomisosSchema,

  // ----- READ ONLY ------
  tipoDeclaracion: {
    type: String,
    enum: TipoDeclaracion,
    required: true,
  },
  declaracionCompleta: {
    type: Boolean,
    required: true,
    default: true,
  },
  firmada: {
    type: Boolean,
    default: false,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
}, options);
