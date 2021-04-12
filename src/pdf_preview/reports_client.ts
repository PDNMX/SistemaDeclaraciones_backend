import Axios from 'axios';
import { DeclaracionDocument } from '../types';

export default class ReportsClient {
  public static async getReport(declaracion: DeclaracionDocument): Promise<Buffer> {
    const responsePreview = await Axios({
      method: 'POST',
      url: `${process.env.REPORTS_URL}/acuse-declaracion`,
      timeout: 5000,
      headers: {
        'X-Api-Key': `${process.env.REPORTS_API_KEY}`,
      },
      responseType: 'arraybuffer',
      data: {
        id: declaracion._id,
        declaracion: declaracion,
        preliminar: !declaracion.firmada,
      },
    });

    return responsePreview.data;
  }
}
