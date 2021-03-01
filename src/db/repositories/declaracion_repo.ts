import {
  DeclaracionDocument,
  DeclaracionSecciones,
  DeclaracionesFilterInput,
  DeclaracionesPage,
  TipoDeclaracion,
} from '../../types';
import DeclaracionModel from '../models/declaracion_model';
import UserModel from '../models/user_model';


export class DeclaracionRepository {
  public static async getAll(filter?: DeclaracionesFilterInput, pageNumber: number = 0): Promise<DeclaracionesPage> {
    const nPerPage = 20;
    const offset: number = (pageNumber > 0) ? ((pageNumber - 1) * nPerPage) : 0;
    const declaraciones = await DeclaracionModel.find({ ...filter })
      .populate('owner')
      .sort({ createAt: 'desc' })
      .skip(offset)
      .limit(nPerPage);

    return {
      docs: declaraciones,
      pageNumber: 0,
    };
  }

  public static async getAllByUser(userID: string, filter?: DeclaracionesFilterInput, pageNumber: number = 0): Promise<DeclaracionesPage> {
    const user = await UserModel.findById(userID);
    if (!user) {
      throw Error('USER DOES NOT EXIST');
    }

    const nPerPage = 20;
    const offset: number = (pageNumber > 0) ? ((pageNumber - 1) * nPerPage) : 0;
    const declaraciones = await DeclaracionModel.find({ owner: user, ...filter })
      .populate('owner')
      .sort({ createAt: 'desc' })
      .skip(offset)
      .limit(nPerPage);

    return {
      docs: declaraciones,
      pageNumber: 0,
    };
  }

  public static async getOrCreate(
    userID: string,
    tipoDeclaracion: TipoDeclaracion,
    simplificada = false,
  ): Promise<DeclaracionDocument> {
    const user = await UserModel.findById(userID);
    if (!user) {
      throw Error('USER DOES NOT EXIST');
    }
    const filter = {
      tipoDeclaracion: tipoDeclaracion,
      simplificada: simplificada,
      completa: false,
      owner: user,
    };

    const declaracion = await DeclaracionModel.findOneAndUpdate(filter, {}, {new: true, upsert: true});
    console.log('FIND DECLARACION');
    console.log(declaracion);

    user.declaraciones.push(declaracion);
    user.save();
    return declaracion;
  }

  public static async update(id: string, userID: string, props: DeclaracionSecciones): Promise<DeclaracionDocument> {
    const declaracion = await DeclaracionModel.findById(id);
    if (!declaracion) {
      throw new Error('DECLARACION NO EXISTE');
    }
    if (declaracion.owner._id != userID || declaracion.completa) {
      throw new Error('NO SE PUEDE MODIFICAR');
    }

    const filter = {
      _id: id,
      completa: false,
    };

    const updatedDeclaracion = await DeclaracionModel.findOneAndUpdate(filter, {$set: props}, {new: true});
    if (!updatedDeclaracion) {
      throw new Error('ERROR ON UPDATING');
    }

    return updatedDeclaracion;
  }
}
