import Axios from 'axios';
import { DeclaracionRepository } from '../db/repositories/declaracion_repo';
import Express from 'express';
import JWTMiddleware from 'express-jwt';
import { Role } from '../types';
import { StatusCodes } from 'http-status-codes';

export default class ReportsAPI {
  private router: Express.Router;

  public constructor() {
    this.router = Express.Router();
    this.router.get(
      '/declaracion-preview/:id',
      JWTMiddleware({ secret: `${process.env.JWT_SECRET}`, algorithms: ['HS256', 'RS256'] }),
      ReportsAPI.declaracionPreview,
    );
  }

  private static async declaracionPreview(req: Express.Request, res: Express.Response): Promise<any> {
    const roles: Role[] = req.user.roles;
    if (!roles.includes(Role.USER) && !roles.includes(Role.SUPER_ADMIN))  {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        success: false,
        message: `User: ${req.user.id} is not AUTHORIZED to perform this operation.`,
      });
    }

    const declaracion = await DeclaracionRepository.get(req.params.id);
    if (!roles.includes(Role.SUPER_ADMIN) && req.user.id != declaracion.owner._id) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        success: false,
        message: `User: ${req.user.id} is not AUTHORIZED to perform this operation on declaracion: ${req.params.id}.`,
      });
    }

    try {
      const responsePreview = await Axios({
        method: 'POST',
        url: `${process.env.REPORTS_URL}/acuse-declaracion`,
        timeout: 5000,
        headers: {
          'X-Api-Key': `${process.env.REPORTS_API_KEY}`,
        },
        responseType: 'arraybuffer',
        data: {
          id: req.params.id,
          declaracion: declaracion,
          preliminar: !declaracion.completa,
        },
      });

      res.contentType('application/pdf');
      res.setHeader('Access-Control-Allow-Origin', '*');
      // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

      return res.status(StatusCodes.OK).send(responsePreview.data);
    } catch(err) {
      console.log(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'Something went wrong',
      });
    }
  }

  public getRouter(): Express.Router {
    return this.router;
  }

  public static create(app: Express.Application): void {
    const api: ReportsAPI = new ReportsAPI();
    app.use(api.getRouter());
  }
}
