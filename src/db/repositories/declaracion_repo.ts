import { BCrypt, SendgridClient } from '../../library';
import {
  DeclaracionDocument,
  DeclaracionSecciones,
  DeclaracionesFilterInput,
  Pagination,
  PaginationInputOptions,
  TipoDeclaracion,
  Role
} from '../../types';
import CreateError from 'http-errors';
import DeclaracionModel from '../models/declaracion_model';
import ReportsClient from '../../pdf_preview/reports_client';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/user_model';
//import mongoose from 'mongoose';

export class DeclaracionRepository {
  public static async delete(declaracionID: string, userID: string): Promise<boolean> {
    const declaracion = await DeclaracionModel.findById({ _id: declaracionID });
    if (!declaracion) {
      throw new CreateError.NotFound(`Declaration[${declaracionID}] does not exist.`);
    } else if (declaracion.owner._id != userID) {
      throw new CreateError.Forbidden(`User: ${userID} is not allowed to delete declaracion[${declaracionID}]`);
    } else if (declaracion.firmada) {
      throw new CreateError.NotAcceptable(`Declaracion[${declaracionID}] is signed and can not be deleted`);
    }

    declaracion.delete();
    return true;
  }

  public static async get(declaracionID: string): Promise<DeclaracionDocument> {
    const declaracion = await DeclaracionModel.findById({ _id: declaracionID });
    if (!declaracion) {
      throw new CreateError.NotFound(`Declaration[${declaracionID}] does not exist.`);
    }

    return declaracion;
  }

  public static async getAll(filter?: DeclaracionesFilterInput, pagination: PaginationInputOptions = {}): Promise<Pagination<DeclaracionDocument>> {
    filter = filter || {};
    const page: number = pagination.page || 0;
    const limit: number = pagination.size || 20;
    const declaraciones = await DeclaracionModel.paginate({
      query: { ...filter },
      sort: { createdAt: 'desc'},
      populate: 'owner',
      page: page + 1,
      limit: Math.min(limit, 100),
    });
    if (declaraciones) {
      return declaraciones;
    }

    return { docs: [], page, limit, hasMore: false, hasNextPage: false, hasPrevPage: false };
  }

  public static async getAllByUser(userID: string, filter?: DeclaracionesFilterInput, pagination: PaginationInputOptions = {}): Promise<Pagination<DeclaracionDocument>> {
    filter = filter || {};
    const user = await UserModel.findById({ _id: userID });
    if (!user) {
      throw new CreateError.NotFound(`User[${userID}] does not exist.`);
    }

    const page: number = pagination.page || 0;
    const limit: number = pagination.size || 20;
    const declaraciones = await DeclaracionModel.paginate({
      query: { owner: user, ...filter },
      sort: { createdAt: 'desc'},
      populate: 'owner',
      page: page + 1,
      limit: Math.min(limit, 100),
    });
    if (declaraciones) {
      return declaraciones;
    }

    return { docs: [], page, limit, hasMore: false, hasNextPage: false, hasPrevPage: false };
  }

  public static async getOrCreate(
    userID: string,
    tipoDeclaracion: TipoDeclaracion,
    declaracionCompleta = true,
  ): Promise<DeclaracionDocument> {
    const user = await UserModel.findById({ _id: userID });
    if (!user) {
      throw new CreateError.NotFound(`User[${userID}] does not exist.`);
    }
    const filter = {
      tipoDeclaracion: tipoDeclaracion,
      declaracionCompleta: declaracionCompleta,
      firmada: false,
      owner: user,
    };

    // Se busca la última declaración del usuario, para que si ya tiene una declaración, se copien los datos
    // de la última declaración a la nueva
    var declaracion = await DeclaracionModel.findOne(filter);

    if(declaracion == null) {
      console.log("No se encontró una declaración iniciada con el filtro especificado");
      console.log(filter);
      //no tiene declaraciones iniciadas, 
      //buscar si tiene alguna que ya haya conlcuido para copiarle los datos

      var ultimaDeclaracion: any = await DeclaracionModel.findOne({
        owner: user,
        firmada: true,
      });

      var nuevaDeclaracion: DeclaracionDocument = new DeclaracionModel();

      if(ultimaDeclaracion != null)
      {
        console.log("Se encontró una declaración anterior, se copiará");
        nuevaDeclaracion.firmada = false;
        nuevaDeclaracion.declaracionCompleta = declaracionCompleta;
        nuevaDeclaracion.datosGenerales = ultimaDeclaracion.datosGenerales;
        nuevaDeclaracion.domicilioDeclarante = ultimaDeclaracion.domicilioDeclarante;
        nuevaDeclaracion.datosCurricularesDeclarante = ultimaDeclaracion.datosCurricularesDeclarante;
        nuevaDeclaracion.datosEmpleoCargoComision = ultimaDeclaracion.datosEmpleoCargoComision;
        nuevaDeclaracion.experienciaLaboral = ultimaDeclaracion.experienciaLaboral;
        nuevaDeclaracion.datosPareja = ultimaDeclaracion.datosPareja;
        nuevaDeclaracion.datosDependientesEconomicos = ultimaDeclaracion.datosDependientesEconomicos;
        nuevaDeclaracion.actividadAnualAnterior = ultimaDeclaracion.actividadAnualAnterior;
        nuevaDeclaracion.bienesInmuebles = ultimaDeclaracion.bienesInmuebles;
        nuevaDeclaracion.vehiculos = ultimaDeclaracion.vehiculos;
        nuevaDeclaracion.bienesMuebles = ultimaDeclaracion.bienesMuebles;
        nuevaDeclaracion.inversionesCuentasValores = ultimaDeclaracion.inversionesCuentasValores;
        nuevaDeclaracion.adeudosPasivos = ultimaDeclaracion.adeudosPasivos;
        nuevaDeclaracion.prestamoComodato = ultimaDeclaracion.prestamoComodato;

        //intereses
        nuevaDeclaracion.participacion = ultimaDeclaracion.participacion;
        nuevaDeclaracion.participacionTomaDecisiones = ultimaDeclaracion.participacionTomaDecisiones;
        nuevaDeclaracion.apoyos = ultimaDeclaracion.apoyos;
        nuevaDeclaracion.representaciones = ultimaDeclaracion.representaciones;
        nuevaDeclaracion.clientesPrincipales = ultimaDeclaracion.clientesPrincipales;
        nuevaDeclaracion.beneficiosPrivados = ultimaDeclaracion.beneficiosPrivados;
        nuevaDeclaracion.fideicomisos = ultimaDeclaracion.fideicomisos;
        declaracion = await DeclaracionModel.findOneAndUpdate(filter, nuevaDeclaracion, {new: true, upsert: true});
      }
      else{
        console.log("No se encontró una última declaración :(");
        declaracion = await DeclaracionModel.findOneAndUpdate(filter, {}, {new: true, upsert: true});
      }

      user.declaraciones.push(declaracion);
      user.save();
    }
    else
    {
      console.log("Sí hay una declaración con el filtro especificado");
      console.log(filter);
    }

    return declaracion;
  }

  public static async sign(declaracionID: string, password: string, userID: string): Promise<Record<string, any> | null> {
    
    const declaracion = await DeclaracionModel.findById({ _id: declaracionID });
    if (!declaracion) {
      throw new CreateError.NotFound(`Declaration[${declaracionID}] does not exist.`);
    } else if (declaracion.owner._id != userID) {
      throw new CreateError.Forbidden(`User: ${userID} is not allowed to sign declaracion[${declaracionID}]`);
    }

    const user = await UserModel.findById({ _id: userID });
    if (!user) {
      throw new CreateError.NotFound(`User[${userID}] does not exist.`);
    }
    if (!BCrypt.compare(password, user.password)) {
      throw new CreateError.Forbidden('Provided password does not match.');
    }

    declaracion.firmada = true;
    declaracion.save();
    var responsePreview;
    try{
      responsePreview = await ReportsClient.getReport(declaracion);
    }
    catch(e) {
      throw new CreateError.InternalServerError('Error al firmar la declaración');
    }

    try {
      await SendgridClient.sendDeclarationFile(user.username, responsePreview.toString('base64'));
    } catch(e) {
      throw new CreateError.InternalServerError('Se firmó la declaración pero no se pudo enviar por correo electrónico' + e);
    }

    const missingFields = ['a', 'b', 'c'];
    return missingFields;
  }

  /// Se agrega el método para la autorización de publicar las declaraciones
  public static async autorizarPublica(declaracionID: string, autoriza: boolean, userID: string): Promise<boolean | null> {
    const user = await UserModel.findById({ _id: userID });

    if (!user) {
      throw new CreateError.NotFound(`El usuario [${userID}] no está registrado en el sistema.`);
    }

    const declaracion = await DeclaracionModel.findById({ _id: declaracionID });
    if (!declaracion) {
      throw new CreateError.NotFound(`Declaración [${declaracionID}] no encontrada`);
    } else if (declaracion.owner._id != userID && !(user.roles.indexOf(Role.ROOT) >= 0) ) {
      throw new CreateError.Forbidden(`El usuario: ${userID} no tiene acceso a la declaración [${declaracionID}]`);
    }

    declaracion.autorizaPublica = autoriza;
    try{
      declaracion.save();
    }
    catch(err){
      console.log("Error al autorizar publica")
      console.log(err);
    }

    return new Promise(
      (resolve) => {
        return true;
      }
    );
  }

  public static async update(declaracionID: string, userID: string, props: DeclaracionSecciones): Promise<DeclaracionDocument> {
    const declaracion = await DeclaracionModel.findById({ _id: declaracionID });
    if (!declaracion) {
      throw new CreateError.NotFound(`Declaration with ID: ${declaracionID} does not exist.`);
    } else if (declaracion.owner._id != userID) {
      throw new CreateError.Forbidden(`User: ${userID} is not allowed to update declaracion[${declaracionID}]`);
    } else if (declaracion.firmada) {
      throw new CreateError.NotAcceptable(`Declaracion[${declaracionID}] is already signed, it cannot be updated.`);
    }

    const filter = {
      _id: declaracionID,
      firmada: false,
    };
    const options = {
      new: true,
      runValidators: true,
      context: 'query',
    };

    var error = null;
    const updatedDeclaracion = await DeclaracionModel.findOneAndUpdate(filter, {$set: props}, options, (err,doc)=> {
      if(err)
        error = err;
    });

    if(error != null) {
      throw CreateError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          error,
          { debug_info: { declaracionID, userID, props }},
      );
    }

    if (!updatedDeclaracion) {
      throw CreateError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error al actualizar la declaracion",
        { debug_info: { declaracionID, userID, props }},
    );
    }

    return updatedDeclaracion;
  }
}
