import { BCrypt, SendgridClient } from '../../library';
import {
  DeclaracionDocument,
  DeclaracionSecciones,
  DeclaracionesFilterInput,
  Pagination,
  PaginationInputOptions,
  TipoDeclaracion,
  
} from '../../types';
import CreateError from 'http-errors';
import DeclaracionModel from '../models/declaracion_model';

import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/user_model';

import ReportsClient from '../../pdf_preview/reports_client';
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
      owner: user
    };

    // 19/07/2021
    // Se busca la última declaración del usuario, para que si ya tiene una declaración, se copien los datos
    // de la última declaración a la nueva
    //var declaracion = await DeclaracionModel.findOne(filter);
    // 03/05/2023: Se jala la última declaración
    var declaracion = null;
    var declaraciones = await DeclaracionModel.find(filter).sort({"updatedAt": -1}).limit(1);
    if(declaraciones.length > 0) {
      //si encontró declaraciones
      declaracion = declaraciones[0];
    }

    if(declaracion == null) {
      //no tiene declaraciones iniciadas, 
      //buscar si tiene alguna que ya haya conlcuido para copiarle los datos

      // 03/05/2023: Se jala la última declaración
      var ultimaDeclaracion: any = null;
      var ultimasDeclaraciones: any = await DeclaracionModel.find({
        owner: user,
        firmada: true
      }).sort({
        "createdAt": -1
      })
      .limit(1);

      if(ultimasDeclaraciones.length > 0)
        ultimaDeclaracion = ultimasDeclaraciones[0];

      var nuevaDeclaracion: DeclaracionDocument = new DeclaracionModel();

      if(ultimaDeclaracion != null)
      {
        nuevaDeclaracion.firmada = false;
        nuevaDeclaracion.owner = user;
        nuevaDeclaracion.declaracionCompleta = declaracionCompleta;
        nuevaDeclaracion.datosGenerales = Object.assign({}, ultimaDeclaracion.datosGenerales);
        nuevaDeclaracion.domicilioDeclarante = Object.assign({}, ultimaDeclaracion.domicilioDeclarante);
        nuevaDeclaracion.datosCurricularesDeclarante = Object.assign({}, ultimaDeclaracion.datosCurricularesDeclarante);
        nuevaDeclaracion.datosEmpleoCargoComision = ultimaDeclaracion.datosEmpleoCargoComision != null ? Object.assign({}, ultimaDeclaracion.datosEmpleoCargoComision) : null;
        nuevaDeclaracion.experienciaLaboral = Object.assign({}, ultimaDeclaracion.experienciaLaboral);
        nuevaDeclaracion.datosPareja = ultimaDeclaracion.datosPareja != null ?  Object.assign({}, ultimaDeclaracion.datosPareja) : null;
        nuevaDeclaracion.datosDependientesEconomicos = Object.assign({}, ultimaDeclaracion.datosDependientesEconomicos);
        nuevaDeclaracion.actividadAnualAnterior = ultimaDeclaracion.actividadAnualAnterior != null ? Object.assign({}, ultimaDeclaracion.actividadAnualAnterior) : null;
        nuevaDeclaracion.bienesInmuebles = Object.assign({}, ultimaDeclaracion.bienesInmuebles);
        nuevaDeclaracion.vehiculos = Object.assign({}, ultimaDeclaracion.vehiculos);
        nuevaDeclaracion.bienesMuebles = Object.assign({}, ultimaDeclaracion.bienesMuebles);
        nuevaDeclaracion.inversionesCuentasValores = Object.assign({}, ultimaDeclaracion.inversionesCuentasValores);
        nuevaDeclaracion.adeudosPasivos = Object.assign({}, ultimaDeclaracion.adeudosPasivos);
        nuevaDeclaracion.prestamoComodato = Object.assign({}, ultimaDeclaracion.prestamoComodato);

        //intereses
        nuevaDeclaracion.participacion = Object.assign({}, ultimaDeclaracion.participacion);
        nuevaDeclaracion.participacionTomaDecisiones = Object.assign({}, ultimaDeclaracion.participacionTomaDecisiones);
        nuevaDeclaracion.apoyos = Object.assign({}, ultimaDeclaracion.apoyos);
        nuevaDeclaracion.representaciones = Object.assign({}, ultimaDeclaracion.representaciones);
        nuevaDeclaracion.clientesPrincipales = Object.assign({}, ultimaDeclaracion.clientesPrincipales);
        nuevaDeclaracion.beneficiosPrivados = Object.assign({}, ultimaDeclaracion.beneficiosPrivados);
        nuevaDeclaracion.fideicomisos = Object.assign({}, ultimaDeclaracion.fideicomisos);
        declaracion = await DeclaracionModel.findOneAndUpdate(filter, nuevaDeclaracion, {new: true, upsert: true});
      }
      else{
        
        declaracion = await DeclaracionModel.findOneAndUpdate(filter, {}, {new: true, upsert: true});
      }

      user.declaraciones.push(declaracion);
      user.save();
    }
    else
    {
      //
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

    if(declaracion.firmada == true)
      throw new CreateError.Forbidden("Esta declaració ya fue firmada");

    if(!declaracion.datosGenerales)
      throw new CreateError.BadRequest("La declaración no tiene datos generales");

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
    catch(e: any) {
      throw new CreateError.InternalServerError('Error al firmar la declaración: ' + e.toString());
    }

    try {
      await SendgridClient.sendDeclarationFile(user.username, responsePreview);
    } catch(e) {
      throw new CreateError.InternalServerError('Se firmó la declaración pero no se pudo enviar por correo electrónico' + e);
    }

    const missingFields = ['a', 'b', 'c'];
    return missingFields;
  }

  /// 21/SEPT/2022
  /// Se agrega el método para la autorización de publicar las declaraciones
  public static async autorizarPublica(declaracionID: string, autoriza: boolean, userID: string): Promise<boolean | null> {
    // 31 oct 2022, se quita temporalmente
    // const user = await UserModel.findById({ _id: userID });
    
    // if (!user) {
    //   throw new CreateError.NotFound(`El usuario [${userID}] no está registrado en el sistema.`);
    // }

    // const declaracion = await DeclaracionModel.findById({ _id: declaracionID });
    // if (!declaracion) {
    //   throw new CreateError.NotFound(`Declaración [${declaracionID}] no encontrada`);
    // } else if (declaracion.owner._id != userID && !(user.roles.indexOf(Role.ROOT) >= 0) ) {
    //   throw new CreateError.Forbidden(`El usuario: ${userID} no tiene acceso a la declaración [${declaracionID}]`);
    // }

    // declaracion.autorizaPublica = autoriza;
    // try{
    //   declaracion.save();
    // }
    // catch(err){
    //   console.log("Error al autorizar publica")
    //   console.log(err);
    // }

    return new Promise(
      (resolve) => {
        return true;
      }
    );
  }

  public static async enviarDeclaracion(declaracionID: string, userID: string): Promise<boolean | null> {
    var responsePreview;
    const declaracion = await DeclaracionModel.findById({ _id: declaracionID });

    if (!declaracion) {
      throw new CreateError.NotFound(`Declaration[${declaracionID}] does not exist.`);
    } else if (declaracion.owner._id != userID) {
      throw new CreateError.Forbidden(`User: ${userID} is not allowed to sign declaracion[${declaracionID}]`);
    }

    try{
      responsePreview = await ReportsClient.getReport(declaracion);
    }
    catch(e: any) {
      throw new CreateError.InternalServerError('Error al generar el reporte: ' + e);
    }

    const user = await UserModel.findById({ _id: userID });
    if (!user) {
      throw new CreateError.NotFound(`User[${userID}] does not exist.`);
    }

    try {
      return await SendgridClient.sendDeclarationFile(user.username, responsePreview);
    } catch(e: any) {
      throw new CreateError.InternalServerError(e);
    }
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
