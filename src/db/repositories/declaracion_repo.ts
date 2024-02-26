import { BCrypt, SendgridClient } from '../../library';
import { DeclaracionDocument, DeclaracionSecciones, DeclaracionesFilterInput, Pagination, PaginationInputOptions, TipoDeclaracion } from '../../types';
import CreateError from 'http-errors';
import DeclaracionModel from '../models/declaracion_model';
import ReportsClient from '../../pdf_preview/reports_client';
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

  public static async getAll(filter?: DeclaracionesFilterInput, pagination: PaginationInputOptions = {}): Promise<Pagination<DeclaracionDocument>> {
    filter = filter || {};
    const page: number = pagination.page || 0;
    const limit: number = pagination.size || 20;
    const declaraciones = await DeclaracionModel.paginate({
      query: { ...filter },
      sort: { createdAt: 'desc' },
      populate: 'owner',
      page: page + 1,
      limit: Math.min(limit, 100)
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
      sort: { createdAt: 'desc' },
      populate: 'owner',
      page: page + 1,
      limit: Math.min(limit, 100)
    });
    if (declaraciones) {
      return declaraciones;
    }

    return { docs: [], page, limit, hasMore: false, hasNextPage: false, hasPrevPage: false };
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

  public static async lastDeclaracion(userID: string): Promise<DeclaracionDocument> {
    const user = await UserModel.findById({ _id: userID });
    if (!user) {
      throw new CreateError.NotFound(`User[${userID}] does not exist.`);
    }

    const filter = {
      owner: user,
      firmada: true
    };

    const declaracion = await DeclaracionModel.findOne(filter, {}, { sort: { updatedAt: -1 } });
    return declaracion as any;
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
    try {
      const responsePreview = await ReportsClient.getReport(declaracion);
      await SendgridClient.sendDeclarationFile(user.username, responsePreview.toString('base64'));
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
