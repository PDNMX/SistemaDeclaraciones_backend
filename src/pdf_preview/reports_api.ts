import { DeclaracionRepository } from '../db/repositories/declaracion_repo';
import Express from 'express';
import JWTMiddleware from 'express-jwt';
import ReportsClient from './reports_client';
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
    const scopes: string[] = req.user.scopes;
    if (!scopes.includes('DeclarationPreview:read:mine') && !scopes.includes('DeclarationPreview:read:all')) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        success: false,
        message: `User: ${req.user.id} is not AUTHORIZED to perform this operation.`,
      });
    }

    const declaracion = await DeclaracionRepository.get(req.params.id);
    if (!scopes.includes('DeclarationPreview:read:all') && req.user.id != declaracion.owner._id) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        success: false,
        message: `User: ${req.user.id} is not AUTHORIZED to perform this operation on declaracion: ${req.params.id}.`,
      });
    }

    try {
      const responsePreview = await ReportsClient.getReport(declaracion);
      res.contentType('application/pdf');
      res.setHeader('Access-Control-Allow-Origin', '*');

      return res.status(StatusCodes.OK).send(responsePreview);
    } catch(err) {
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
