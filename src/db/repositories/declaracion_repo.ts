//import { BCrypt, SendgridClient } from '../../library';
import { BCrypt, emailService } from '../../library';
import { Context, DeclaracionDocument, DeclaracionSecciones, DeclaracionesFilterInput, Pagination, PaginationInputOptions, TipoDeclaracion } from '../../types';
import CreateError from 'http-errors';
import DeclaracionModel from '../models/declaracion_model';
import InstitucionesAPI from '../../routers/instituciones_api';
import ReportsClient from '../../pdf_preview/reports_client';
import { Role } from './../../types/enums';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/user_model';

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

  public static async getAll(filter?: DeclaracionesFilterInput, pagination: PaginationInputOptions = {}, context?: Context): Promise<Pagination<DeclaracionDocument>> {
    // Se mantiene la lógica de filtros existente.
    const query: Record<string, any> = { ...filter };
    const page: number = pagination.page || 0;
    const limit: number = pagination.size || 20;
    // Nuevo: Se obtienen los parámetros de ordenamiento. Por defecto, ordena por 'updatedAt' de más reciente a más antiguo.
    const sortField = pagination.sort || 'updatedAt';
    const sortDirection = pagination.direction === 'asc' ? 1 : -1;

    const id = context?.user.id;
    const user = await UserModel.findById({ _id: id });
    if (!user?.roles.includes(Role.ROOT)) {
      const institucion = user?.institucion?.clave;
      if (institucion) {
        // Se ajusta el filtro para que funcione con el modelo de Declaracion, buscando por el 'owner' que pertenece a la institución.
        const usersInInstitucion = await UserModel.find({ 'institucion.clave': institucion }).select('_id');
        const userIds = usersInInstitucion.map(u => u._id);
        query['owner'] = { $in: userIds };
      }
    }

    // Para ordenar por un campo en una colección relacionada (como 'owner.username'),
    // necesitamos usar una agregación de MongoDB.
    const aggregate = DeclaracionModel.aggregate();
    
    // 1. Unir la colección de 'users' con 'declaraciones' usando el campo 'owner'.
    aggregate.lookup({
      from: 'users',
      localField: 'owner',
      foreignField: '_id',
      as: 'ownerInfo'
    });
    
    // 2. Descomponer el array resultante para tener un solo objeto de usuario por declaración.
    aggregate.unwind('$ownerInfo');
    
    // 3. Aplicar los filtros de la consulta.
    aggregate.match(query);
    
    // 4. Reemplazar el campo 'owner' (que es solo un ID) con el objeto completo del usuario.
    aggregate.addFields({
      owner: '$ownerInfo'
    });
    
    // 5. Contar el total de documentos que coinciden con el filtro (para la paginación).
    const totalDocs = (await DeclaracionModel.aggregate(aggregate.pipeline()).count("totalDocs"))[0]?.totalDocs || 0;
    
    // 6. Aplicar ordenamiento, salto y límite para la paginación.
    aggregate.sort({ [sortField]: sortDirection });
    aggregate.skip(page * limit);
    aggregate.limit(limit);
    
    // 7. Ejecutar la consulta de agregación final para obtener los documentos de la página actual.
    const docs = await aggregate.exec();
    
    const totalPages = Math.ceil(totalDocs / limit);
    const hasNextPage = page + 1 < totalPages;
    const hasPrevPage = page > 0;
    
    const declaraciones = {
      docs,
      totalDocs,
      limit,
      page: page,
      totalPages,
      hasNextPage,
      hasPrevPage,
      pagingCounter: page * limit + 1,
      prevPage: hasPrevPage ? page - 1 : undefined,
      nextPage: hasNextPage ? page + 1 : undefined,
      hasMore: hasNextPage
    };
    
    if (declaraciones) {
      // La librería ya devuelve el objeto con el formato de paginación correcto.
      return declaraciones;
    }

    // En caso de error o si no hay resultados, devolvemos una estructura de paginación vacía.
    return { docs: [], page, limit, hasMore: false, hasNextPage: false, hasPrevPage: false, totalDocs: 0, totalPages: 0, pagingCounter: 0, prevPage: undefined, nextPage: undefined };
  }

  public static async getAllByUser(userID: string, filter?: DeclaracionesFilterInput, pagination: PaginationInputOptions = {}): Promise<Pagination<DeclaracionDocument>> {
    filter = filter || {};
    const user = await UserModel.findById({ _id: userID });
    if (!user) {
      throw new CreateError.NotFound(`User[${userID}] does not exist.`);
    }

    const page: number = pagination.page || 0;
    const limit: number = pagination.size || 20;
    // Nuevo: Se añade la lógica de ordenamiento también a esta función.
    const sortField = pagination.sort || 'updatedAt';
    const sortDirection = pagination.direction === 'asc' ? 1 : -1;

    const query = { owner: user._id, ...filter };
    
    const aggregate = DeclaracionModel.aggregate();
    aggregate.match(query);
    
    aggregate.lookup({
      from: 'users',
      localField: 'owner',
      foreignField: '_id',
      as: 'ownerInfo'
    });
    
    aggregate.unwind('$ownerInfo');
    
    aggregate.addFields({
      owner: '$ownerInfo'
    });
    
    const totalDocs = (await DeclaracionModel.aggregate(aggregate.pipeline()).count("totalDocs"))[0]?.totalDocs || 0;
    
    aggregate.sort({ [sortField]: sortDirection });
    aggregate.skip(page * limit);
    aggregate.limit(limit);
    
    const docs = await aggregate.exec();
    
    const totalPages = Math.ceil(totalDocs / limit);
    const hasNextPage = page + 1 < totalPages;
    const hasPrevPage = page > 0;
    
    const declaraciones = { docs, totalDocs, limit, page, totalPages, hasNextPage, hasPrevPage, pagingCounter: page * limit + 1, prevPage: hasPrevPage ? page - 1 : undefined, nextPage: hasNextPage ? page + 1 : undefined, hasMore: hasNextPage };
    
    if (declaraciones) {
      return declaraciones;
    }

    // Se actualiza el objeto de retorno para que coincida con la estructura completa de paginación.
    return { docs: [], page, limit, hasMore: false, hasNextPage: false, hasPrevPage: false, totalDocs: 0, totalPages: 0, pagingCounter: 0, prevPage: undefined, nextPage: undefined };
  }

  public static async getOrCreate(userID: string, tipoDeclaracion: TipoDeclaracion, declaracionCompleta = true): Promise<DeclaracionDocument> {
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

    const declaracion = await DeclaracionModel.findOneAndUpdate(filter, {}, { new: true, upsert: true });
    user.declaraciones.push(declaracion);
    user.save();

    return declaracion;
  }

  public static async lastDeclaracion(userID: string): Promise<DeclaracionDocument | null> {
    const user = await UserModel.findById({ _id: userID });
    if (!user) {
      throw new CreateError.NotFound(`User[${userID}] does not exist.`);
    }

    const filter = {
      owner: user,
      firmada: true
    };

    const declaracion = await DeclaracionModel.findOne(filter, {}, { sort: { updatedAt: -1 } });
    return declaracion || null;
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

    const insData = InstitucionesAPI.getInstitucionDataByClave(user.institucion?.clave || '', declaracion.tipoDeclaracion);
    await InstitucionesAPI.recordUserDec(declaracion._id, user._id, insData);

    try {
      //const responsePreview = await ReportsClient.getReport(declaracion);
      //await SendgridClient.sendDeclarationFile(user.username, responsePreview.toString('base64'));
      const responsePreview = await ReportsClient.getReport(declaracion);
      await emailService.sendDeclarationFile(user.username, responsePreview.toString('base64'));
    } catch (e) {
      throw new CreateError.InternalServerError('There was a problem sending the Report');
    }

    const missingFields = ['a', 'b', 'c'];
    return missingFields;
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
      firmada: false
    };
    const options = {
      new: true,
      runValidators: true,
      context: 'query'
    };

    const updatedDeclaracion = await DeclaracionModel.findOneAndUpdate(filter, { $set: props }, options);
    if (!updatedDeclaracion) {
      throw CreateError(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong at Declaracion.update', { debug_info: { declaracionID, userID, props } });
    }

    return updatedDeclaracion;
  }
}