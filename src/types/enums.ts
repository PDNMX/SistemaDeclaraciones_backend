export enum AmbitoPublico {
  EJECUTIVO = 'EJECUTIVO',
  LEGISLATIVO = 'LEGISLATIVO',
  JUDICIAL = 'JUDICIAL',
  ORGANO_AUTONOMO = 'ORGANO_AUTONOMO',
}

export enum EscolaridadEstatus {
   CURSANDO = 'CURSANDO',
   FINALIZADO = 'FINALIZADO',
   TRUNCO = 'TRUNCO',
}

export enum EscolaridadDocumentoObtenido {
  BOLETA = 'BOLETA',
  CERTIFICADO = 'CERTIFICADO',
  CONSTANCIA = 'CONSTANCIA',
  TITULO = 'TITULO',
}

export enum FormaPago {
  CONTADO = 'CONTADO',
  CREDITO = 'CREDITO',
  NO_APLICA = 'NO_APLICA',
}

export enum FormaRecepcion {
  MONETARIO = 'MONETARIO',
  ESPECIE = 'ESPECIE',
}

export enum LugarResidencia {
  MEXICO = 'MEXICO',
  EXTRANJERO = 'EXTRANJERO',
  SE_DESCONOCE = 'SE_DESCONOCE',
}

export enum MexicoExtranjero {
  MX = 'MX',
  EX = 'EX',
}

export enum NivelOrdenGobierno {
  FEDERAL = 'FEDERAL',
  ESTATAL = 'ESTATAL',
  MUNICIPAL_ALCALDIA = 'MUNICIPAL_ALCALDIA'
}

export enum RelacionConDeclarante {
  CONYUGE = 'CONYUGE',
  CONCUBINA_CONCUBINARIO_UNION_LIBRE = 'CONCUBINA_CONCUBINARIO_UNION_LIBRE',
  SOCIEDAD_DE_CONVIVENCIA = 'SOCIEDAD_DE_CONVIVENCIA',
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum TipoDeclaracion {
  INICIAL = 'INICIAL',
  MODIFICACION = 'MODIFICACION',
  CONCLUSION = 'CONCLUSION',
}

export enum TipoFideicomiso {
  PUBLICO = 'PUBLICO',
  PRIVADO = 'PRIVADO',
  MIXTO = 'MIXTO',
}

export enum TipoOperacion {
  AGREGAR = 'AGREGAR',
  MODIFICAR = 'MODIFICAR',
  SIN_CAMBIOS = 'SIN_CAMBIOS',
  BAJA = 'BAJA',
}

export enum TipoParticipacionFideicomiso {
  FIDEICOMITENTE = 'FIDEICOMITENTE',
  FIDUCIARIO = 'FIDUCIARIO',
  FIDEICOMISARIO = 'FIDEICOMISARIO',
  COMITE_TECNICO = 'COMITE_TECNICO',
}

export enum TipoPersona {
  FISICA = 'FISICA',
  MORAL = 'MORAL',
}

export enum TipoRelacion {
  DECLARANTE = 'DECLARANTE',
  PAREJA = 'PAREJA',
  DEPENDIENTE_ECONOMICO = 'DEPENDIENTE_ECONOMICO',
}

export enum TipoRepresentacion {
  REPRESENTANTE = 'REPRESENTANTE',
  REPRESENTADO = 'REPRESENTADO',
}

export enum UnidadMedida {
  m2 = 'm2',
  ha = 'ha',
  km2 = 'km2',
}

export enum ValorConformeA {
  ESCRITURA_PUBLICA = 'ESCRITURA_PUBLICA',
  SENTENCIA = 'SENTENCIA',
  CONTRATO = 'CONTRATO',
}
