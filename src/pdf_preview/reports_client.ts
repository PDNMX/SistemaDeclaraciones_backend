import Axios from 'axios';
import { DeclaracionDocument } from '../types';

export default class ReportsClient {
  public static async getReport(declaracion: DeclaracionDocument): Promise<Buffer> {
    console.log("getDeclaracionNormal");
    
    const responsePreview = await Axios({
      method: 'POST',
      url: `${process.env.REPORTS_URL}/acuse-declaracion`,
      timeout: 15000,
      headers: {
        'X-Api-Key': `${process.env.REPORTS_API_KEY}`,
      },
      responseType: 'arraybuffer',
      data: {
        id: declaracion._id,
        declaracion: declaracion,
        preliminar: !declaracion.firmada,
        publica: "false"
      },
    });

    return responsePreview.data;
  }

  //declaración pública:
  public static async getDeclaracionPublica(declaracion: DeclaracionDocument): Promise<Buffer> {
    console.log("getDeclaracionPublica");

    const responsePreview = await Axios({
      method: 'POST',
      url: `${process.env.REPORTS_URL}/acuse-declaracion`,
      timeout: 15000,
      headers: {
        'X-Api-Key': `${process.env.REPORTS_API_KEY}`,
      },
      responseType: 'arraybuffer',
      data: {
        id: declaracion._id,
        declaracion: declaracion,
        publica: "true",
      },
    });

    return responsePreview.data;
  }
}
