import * as enums from '../enums';

interface Catalogo {
  clave: string;
  valor: string;
}

interface Monto {
  valor?: number;
  moneda?: string;
}

interface Ubicacion {
  pais?: string;
  entidadFederativa?: Catalogo;
}

interface RFC {
  rfc: string;
  homoClave?: string;
}

interface CorreoElectronico {
  institucional?: string;
  personal?: string;
}

interface Telefono {
  casa?: string;
  celularPersonal?: string;
}

interface DatosGenerales {
  nombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  curp?: string;
  rfc?: RFC;
  correoElectronico?: CorreoElectronico;
  telefono?: Telefono;
  situacionPersonalEstadoCivil?: Catalogo;
  regimenMatrimonial?: Catalogo;
  paisNacimiento?: string;
  nacionalidad?: string;
  aclaracionesObservaciones?: string;
}

interface DomicilioMexico {
  calle?: string;
  numeroExterior?: string;
  numeroInterior?: string;
  coloniaLocalidad?: string;
  municipioAlcaldia?: Catalogo;
  entidadFederativa?: Catalogo;
  codigoPostal?: string;
}

interface DomicilioExtranjero {
  calle?: string;
  numeroExterior?: string;
  numeroInterior?: string;
  ciudadLocalidad?: string;
  estadoProvincia?: string;
  pais?: string;
  codigoPostal?: string;
}

interface DomicilioDeclarante {
  domicilioMexico?: DomicilioMexico;
  domicilioExtranjero?: DomicilioExtranjero;
  aclaracionesObservaciones?: string;
}

interface InstitucionEducativa {
  nombre?: string;
  ubicacion?: string;
}

interface Escolaridad {
  tipoOperacion?: string;
  nivel?: Catalogo;
  institucionEducativa?: InstitucionEducativa;
  carreraAreaConocimiento?: string;
  estatus?: enums.EscolaridadEstatus;
  documentoObtenido?: enums.EscolaridadDocumentoObtenido;
  fechaObtencion?: string;
}

interface DatosCurricularesDeclarante {
  escolaridad?: Escolaridad[];
  aclaracionesObservaciones?: string;
}

interface TelefonoOficina {
  telefono?: string;
  extension?: string;
}

interface DatosEmpleoCargoComision {
  tipoOperacion?: enums.TipoOperacion;
  nivelOrdenGobierno?: enums.NivelOrdenGobierno;
  ambitoPublico?: enums.AmbitoPublico;
  nombreEntePublico?: string;
  areaAdscripcion?: string;
  empleoCargoComision?: string;
  contratadoPorHonorarios?: boolean;
  nivelEmpleoCargoComision?: string;
  funcionPrincipal?: string;
  fechaTomaPosesion?: string;
  telefonoOficina?: TelefonoOficina;
  domicilioMexico?: DomicilioMexico;
  domicilioExtranjero?: DomicilioExtranjero;
  cuentaConOtroCargoPublico?: boolean;
  otroEmpleoCargoComision?: OtroEmpleoCargoComision[];
  aclaracionesObservaciones?: string;
}

interface OtroEmpleoCargoComision {
  nivelOrdenGobierno?: enums.NivelOrdenGobierno;
  ambitoPublico?: enums.AmbitoPublico;
  nombreEntePublico?: string;
  areaAdscripcion?: string;
  empleoCargoComision?: string;
  contratadoPorHonorarios?: boolean;
  nivelEmpleoCargoComision?: string;
  funcionPrincipal?: string;
  fechaTomaPosesion?: string;
  telefonoOficina?: TelefonoOficina;
  domicilioMexico?: DomicilioMexico;
  domicilioExtranjero?: DomicilioExtranjero;
}

interface Experiencia {
  ambitoSector?: Catalogo;
  nivelOrdenGobierno?: enums.NivelOrdenGobierno;
  ambitoPublico?: enums.AmbitoPublico;
  nombreEntePublico?: string;
  areaAdscripcion?: string;
  empleoCargoComision?: string;
  funcionPrincipal?: string;
  fechaIngreso?: string;
  fechaEgreso?: string;
  ubicacion?: enums.MexicoExtranjero;
  nombreEmpresaSociedadAsociacion?: string;
  rfc?: string;
  area?: string;
  puesto?: string;
  sector?: Catalogo;
}

interface ExperienciaLaboral {
  ninguno?: boolean;
  experiencia?: Experiencia[];
  aclaracionesObservaciones?: string;
}

interface ActividadLaboralSectorPublico {
  nivelOrdenGobierno?: enums.NivelOrdenGobierno;
  ambitoPublico?: enums.AmbitoPublico;
  nombreEntePublico?: string;
  areaAdscripcion?: string;
  empleoCargoComision?: string;
  funcionPrincipal?: string;
  salarioMensualNeto?: Monto;
  fechaIngreso?: string;
}

interface ActividadLaboralSectorPrivadoOtro {
  nombreEmpresaSociedadAsociacion?: string;
  empleoCargoComision?: string;
  rfc?: string;
  fechaIngreso?: string;
  sector?: Catalogo;
  salarioMensualNeto?: Monto;
  proveedorContratistaGobierno?: boolean;
}

interface DatosPareja {
  ninguno?: boolean;
  nombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  fechaNacimiento?: string;
  rfc?: string;
  relacionConDeclarante?: enums.RelacionConDeclarante;
  ciudadanoExtranjero?: boolean;
  curp?: string;
  esDependienteEconomico?: boolean;
  habitaDomicilioDeclarante?: boolean;
  lugarDondeReside?: enums.LugarResidencia;
  domicilioMexico?: DomicilioMexico;
  domicilioExtranjero?: DomicilioExtranjero;
  actividadLaboralSectorPublico?: ActividadLaboralSectorPublico;
  actividadLaboralSectorPrivadoOtro?: ActividadLaboralSectorPrivadoOtro;
  aclaracionesObservaciones?: string;
}

interface DependienteEconomico {
  nombre: string;
  primerApellido: string;
  segundoApellido?: string;
  fechaNacimiento?: string;
  rfc?: string;
  parentescoRelacion?: Catalogo;
  extranjero?: boolean;
  curp?: string;
  habitaDomicilioDeclarante?: boolean;
  lugarDondeReside?: enums.LugarResidencia;
  domicilioMexico?: DomicilioMexico;
  domicilioExtranjero?: DomicilioExtranjero;
  actividadLaboralSectorPublico?: ActividadLaboralSectorPublico;
  actividadLaboralSectorPrivadoOtro?: ActividadLaboralSectorPrivadoOtro;
}

interface DatosDependientesEconomicos {
  ninguno?: boolean;
  dependienteEconomico?: DependienteEconomico[];
  aclaracionesObservaciones?: string;
}

interface ActividadIndustrial {
  remuneracion?: Monto;
  nombreRazonSocial?: string;
  tipoNegocio?: string;
}

interface ActividadFinanciera {
  remuneracion?: Monto;
  tipoInstrumento?: Catalogo;
}

interface ServiciosProfesionales {
  remuneracion?: Monto;
  tipoServicio?: string;
}

interface OtrosIngresos {
  remuneracion?: Monto;
  tipoIngreso?: string;
}

interface ActividadIndustrialTotal {
  remuneracionTotal?: Monto;
  actividades?: ActividadIndustrial[];
}

interface ActividadFinancieraTotal {
  remuneracionTotal?: Monto;
  actividades?: ActividadFinanciera[];
}

interface ServiciosProfesionalesTotal {
  remuneracionTotal?: Monto;
  servicios?: ServiciosProfesionales[];
}

interface OtrosIngresosTotal {
  remuneracionTotal?: Monto;
  ingresos?: OtrosIngresos[];
}

interface Ingresos {
  remuneracionMensualCargoPublico?: Monto; //
  otrosIngresosMensualesTotal?: Monto;
  actividadIndustrialComercialEmpresarial?: ActividadIndustrialTotal;
  actividadFinanciera?: ActividadFinancieraTotal;
  serviciosProfesionales?: ServiciosProfesionalesTotal;
  otrosIngresos?: OtrosIngresosTotal;
  ingresoMensualNetoDeclarante?: Monto;
  ingresoMensualNetoParejaDependiente?: Monto;
  totalIngresosMensualesNetos?: Monto;
  aclaracionesObservaciones?: string;
}

interface EnajenacionBienes {
  remuneracion?: Monto;
  tipoBienEnajenado?: string;
}

interface EnajenacionBienesTotal {
  remuneracionTotal?: Monto;
  bienes?: EnajenacionBienes[];
}

interface ActividadAnualAnterior {
  servidorPublicoAnioAnterior?: boolean;
  fechaIngreso?: string;
  fechaConclusion?: string;
  remuneracionNetaCargoPublico?: Monto;
  otrosIngresosTotal?: Monto;
  actividadIndustrialComercialEmpresarial?: ActividadIndustrialTotal;
  actividadFinanciera?: ActividadFinancieraTotal;
  serviciosProfesionales?: ServiciosProfesionalesTotal;
  enajenacionBienes?: EnajenacionBienesTotal;
  otrosIngresos?: OtrosIngresosTotal;
  ingresoNetoAnualDeclarante?: Monto;
  ingresoNetoAnualParejaDependiente?: Monto;
  totalIngresosNetosAnuales?: Monto;
  aclaracionesObservaciones?: string;
}

interface Superficie {
  valor?: number;
  unidad?: enums.UnidadMedida;
}

interface Tercero {
  tipoPersona?: enums.TipoPersona;
  nombreRazonSocial?: string;
  rfc?: string;
}

interface Transmisor {
  tipoPersona?: enums.TipoPersona;
  nombreRazonSocial?: string;
  rfc?: string;
  relacion?: Catalogo;
}

interface BienInmueble {
  tipoInmueble?: Catalogo;
  titular?: Catalogo[];
  porcentajePropiedad?: number;
  superficieTerreno?: Superficie;
  superficieConstruccion?: Superficie;
  tercero?: Tercero[];
  transmisor?: Transmisor[];
  formaAdquisicion?: Catalogo;
  formaPago?: enums.FormaPago;
  valorAdquisicion?: Monto;
  fechaAdquisicion?: string;
  datoIdentificacion?: string;
  valorConformeA?: enums.ValorConformeA;
  domicilioMexico?: DomicilioMexico;
  domicilioExtranjero?: DomicilioExtranjero;
  motivoBaja?: Catalogo;
}

interface BienesInmuebles {
  ninguno?: boolean;
  bienInmueble?: BienInmueble[];
  aclaracionesObservaciones?: string;
}

interface Vehiculo {
  tipoVehiculo?: Catalogo;
  titular?: Catalogo[];
  transmisor?: Transmisor[];
  marca?: string;
  modelo?: string;
  anio?: number;
  numeroSerieRegistro?: string;
  tercero?: Tercero[];
  lugarRegistro?: Ubicacion;
  formaAdquisicion?: Catalogo;
  formaPago?: enums.FormaPago;
  valorAdquisicion?: Monto;
  fechaAdquisicion?: string;
  motivoBaja?: Catalogo;
}

interface Vehiculos {
  ninguno?: boolean;
  vehiculo?: Vehiculo[];
  aclaracionesObservaciones?: string;
}

interface BienMueble {
  titular?: Catalogo[];
  tipoBien?: Catalogo;
  transmisor?: Transmisor[];
  tercero?: Tercero[];
  descripcionGeneralBien?: string;
  formaAdquisicion?: Catalogo;
  formaPago?: enums.FormaPago;
  valorAdquisicion?: Monto;
  fechaAdquisicion?: string;
  motivoBaja?: Catalogo;
}

interface BienesMuebles {
  ninguno?: boolean;
  bienMueble?: BienMueble[];
  aclaracionesObservaciones?: string;
}

interface LocalizacionInversion {
  pais?: string;
  institucionRazonSocial?: string;
  rfc?: string;
}

interface Inversion {
  tipoInversion?: Catalogo;
  subTipoInversion?: Catalogo;
  titular?: Catalogo[];
  tercero?: Tercero[];
  numeroCuentaContrato?: string;
  localizacionInversion?: LocalizacionInversion;
  saldoSituacionActual?: Monto;
}

interface InversionesCuentasValores {
  ninguno?: boolean;
  inversion?: Inversion[];
  aclaracionesObservaciones?: string;
}

interface OtorganteCredito {
  tipoPersona?: enums.TipoPersona;
  nombreInstitucion?: string;
  rfc?: string;
}

interface LocalizacionAdeudo {
  localizacion?: enums.MexicoExtranjero;
  pais?: string;
}

interface Adeudo {
  titular?: Catalogo[];
  tipoAdeudo?: Catalogo;
  numeroCuentaContrato?: string;
  fechaAdquisicion?: string;
  montoOriginal?: Monto;
  saldoInsolutoSituacionActual?: Monto;
  tercero?: Tercero[];
  otorganteCredito?: OtorganteCredito;
  localizacionAdeudo?: LocalizacionAdeudo;
}

interface AdeudosPasivos {
  ninguno?: boolean;
  adeudo?: Adeudo[];
  aclaracionesObservaciones?: string;
}

interface InmueblePrestamo {
  tipoInmueble?: Catalogo;
  domicilioMexico?: DomicilioMexico;
  domicilioExtranjero?: DomicilioExtranjero;
}

interface VehiculoPrestamo {
  tipo?: Catalogo;
  marca?: string;
  modelo?: string;
  anio?: number;
  numeroSerieRegistro?: string;
  lugarRegistro?: Ubicacion;
}

interface TipoBienPrestamo {
  inmueble?: InmueblePrestamo;
  vehiculo?: VehiculoPrestamo;
}

interface DuenoTitularPrestamo {
  tipoDuenoTitular?: enums.TipoPersona;
  nombreTitular?: string;
  rfc?: string;
  relacionConTitular?: string;
}

interface Prestamo {
  tipoBien?: TipoBienPrestamo;
  duenoTitular?: DuenoTitularPrestamo;
}

interface PrestamoComodato {
  ninguno?: boolean;
  prestamo?: Prestamo[];
  aclaracionesObservaciones?: string;
}

interface Participacion {
  tipoOperacion?: enums.TipoOperacion;
  tipoRelacion?: enums.TipoRelacion;
  nombreEmpresaSociedadAsociacion?: string;
  rfc?: string;
  porcentajeParticipacion?: number;
  tipoParticipacion?: Catalogo;
  recibeRemuneracion?: boolean;
  montoMensual?: Monto;
  ubicacion?: Ubicacion;
  sector?: Catalogo;
}

interface Participaciones {
  ninguno?: boolean;
  participacion?: Participacion[];
  aclaracionesObservaciones?: string;
}

interface ParticipacionTD {
  tipoOperacion?: enums.TipoOperacion;
  tipoRelacion?: enums.TipoRelacion;
  tipoInstitucion?: Catalogo;
  nombreInstitucion?: string;
  rfc?: string;
  puestoRol?: string;
  fechaInicioParticipacion?: string;
  recibeRemuneracion?: boolean;
  montoMensual?: Monto;
  ubicacion?: Ubicacion;
}

interface ParticipacionTomaDecisiones {
  ninguno?: boolean;
  participacion?: ParticipacionTD[];
  aclaracionesObservaciones?: string;
}

interface Apoyo {
  tipoOperacion?: enums.TipoOperacion;
  tipoPersona?: enums.TipoPersona;
  beneficiarioPrograma?: Catalogo;
  nombrePrograma?: string;
  institucionOtorgante?: string;
  nivelOrdenGobierno?: enums.NivelOrdenGobierno;
  tipoApoyo?: Catalogo;
  formaRecepcion?: enums.FormaRecepcion;
  montoApoyoMensual?: Monto;
  especifiqueApoyo?: string;
}

interface Apoyos {
  ninguno?: boolean;
  apoyo?: Apoyo[];
  aclaracionesObservaciones?: string;
}

interface Representacion {
  tipoOperacion?: enums.TipoOperacion;
  tipoRelacion?: enums.TipoRelacion;
  tipoRepresentacion?: enums.TipoRepresentacion;
  tipoPersona?: enums.TipoPersona;
  nombreRazonSocial?: string;
  rfc?: string;
  recibeRemuneracion?: boolean;
  montoMensual?: Monto;
  fechaInicioRepresentacion?: string;
  ubicacion?: Ubicacion;
  sector?: Catalogo;
}

interface Representaciones {
  ninguno?: boolean;
  representacion?: Representacion[];
  aclaracionesObservaciones?: string;
}

interface Empresa {
  nombreEmpresaServicio?: string;
  rfc?: string;
}

interface Cliente {
  tipoOperacion?: enums.TipoOperacion;
  realizaActividadLucrativa?: boolean;
  tipoRelacion?: enums.TipoRelacion;
  empresa?: Empresa;
  clientePrincipal?: Tercero;
  sector?: Catalogo;
  montoAproximadoGanancia?: Monto;
  ubicacion?: Ubicacion;
}

interface ClientesPrincipales {
  ninguno?: boolean;
  cliente?: Cliente[];
  aclaracionesObservaciones?: string;
}

interface Beneficio {
  tipoOperacion?: enums.TipoOperacion;
  tipoBeneficio?: Catalogo;
  beneficiario?: [Catalogo];
  otorgante?: Tercero;
  formaRecepcion?: enums.FormaRecepcion;
  especifiqueBeneficio?: string;
  montoMensualAproximado?: Monto;
  sector?: Catalogo
}

interface BeneficiosPrivados {
  ninguno?: boolean;
  beneficio?: Beneficio[];
  aclaracionesObservaciones?: string;
}

interface Fiduciario {
  nombreRazonSocial?: string;
  rfc?: string;
}

interface Fideicomiso {
  tipoOperacion?: enums.TipoOperacion;
  tipoRelacion?: enums.TipoRelacion;
  tipoFideicomiso?: enums.TipoFideicomiso;
  tipoParticipacion?: enums.TipoParticipacionFideicomiso;
  rfcFideicomiso?: string;
  fideicomitente?: Tercero;
  fiduciario?: Fiduciario;
  fideicomisario?: Tercero;
  sector?: Catalogo;
  extranjero?: enums.MexicoExtranjero;
}

interface Fideicomisos {
  ninguno?: boolean;
  fideicomiso?: Fideicomiso[];
  aclaracionesObservaciones?: string;
}

export interface DeclaracionSecciones {
  anioEjercicio?: number;
  datosGenerales?: DatosGenerales;
  domicilioDeclarante?: DomicilioDeclarante;
  datosCurricularesDeclarante?: DatosCurricularesDeclarante;
  datosEmpleoCargoComision?: DatosEmpleoCargoComision;
  experienciaLaboral?: ExperienciaLaboral;
  datosPareja?: DatosPareja;
  datosDependientesEconomicos?: DatosDependientesEconomicos;
  ingresos?: Ingresos;
  actividadAnualAnterior?: ActividadAnualAnterior;
  bienesInmuebles?: BienesInmuebles;
  vehiculos?: Vehiculos;
  bienesMuebles?: BienesMuebles;
  inversionesCuentasValores?: InversionesCuentasValores;
  adeudosPasivos?: AdeudosPasivos;
  prestamoComodato?: PrestamoComodato;
  participacion?: Participaciones;
  participacionTomaDecisiones?: ParticipacionTomaDecisiones;
  apoyos?: Apoyos;
  representaciones?: Representaciones;
  clientesPrincipales?: ClientesPrincipales;
  beneficiosPrivados?: BeneficiosPrivados;
  fideicomisos?: Fideicomisos;
}

export interface Declaracion extends DeclaracionSecciones {
  tipoDeclaracion: enums.TipoDeclaracion;
  declaracionCompleta: boolean;
  firmada: boolean;
  createAt: Date;
  updatedAt: Date;
}
