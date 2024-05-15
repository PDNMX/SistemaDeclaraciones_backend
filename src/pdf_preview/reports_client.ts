import { DeclaracionDocument, UserDocument } from '../types';
import Axios from 'axios';
import InstitucionesAPI from '../routers/instituciones_api';
import UserDecModel from '../db/models/user_dec_model';
import UserModel from '../db/models/user_model';

export default class ReportsClient {
  public static async getReport(declaracion: DeclaracionDocument, query_params: Record<string, any> = {}): Promise<Buffer> {
    declaracion.populate('owner');

    const user = await UserModel.findById({ _id: declaracion.owner });

    const institucion = user?.institucion?.clave;
    let insData = null;

    if (declaracion.firmada) {
      insData = await UserDecModel.findOne({ declaraciones: declaracion._id });
      if (insData === null) {
        insData = InstitucionesAPI.getInstitucionDataByClave(institucion || '', declaracion.tipoDeclaracion);
        await InstitucionesAPI.recordUserDec(declaracion._id, user?._id, insData);
      }
    } else {
      insData = InstitucionesAPI.getInstitucionDataByClave(institucion || '', declaracion.tipoDeclaracion);
    }

    declaracion.owner = user as UserDocument;

    const responsePreview = await Axios({
      method: 'POST',
      url: `${process.env.REPORTS_URL}/acuse-declaracion`,
      timeout: 50000, //
      headers: {
        'X-Api-Key': `${process.env.REPORTS_API_KEY}`
      },
      responseType: 'arraybuffer',
      data: {
        owner: user,
        institucionData: insData,
        id: declaracion._id,
        declaracion: declaracion,
        preliminar: !declaracion.firmada,
        publico: query_params.publico
      }
    });

    return responsePreview.data;
  }
}
