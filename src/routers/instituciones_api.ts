import Express from 'express';
// import JWTMiddleware from 'express-jwt';
import { StatusCodes } from 'http-status-codes';
import instituciones from '../data/instituciones.json';

export default class InstitucionesAPI {
  private router: Express.Router;

  public constructor() {
    this.router = Express.Router();
    // this.router.get('/instituciones', JWTMiddleware({ secret: `${process.env.JWT_SECRET}`, algorithms: ['HS256', 'RS256'] }), InstitucionesAPI.getInstituciones);
    this.router.get('/instituciones', InstitucionesAPI.getInstituciones);
  }

  public getRouter(): Express.Router {
    return this.router;
  }

  public static create(app: Express.Application): void {
    const api: InstitucionesAPI = new InstitucionesAPI();
    app.use(api.getRouter());
  }

  private static async getInstituciones(req: Express.Request, res: Express.Response): Promise<any> {
    const list_instituciones = instituciones.map(({ ente_publico, clave }) => ({ clave, ente_publico }));
    return res.status(StatusCodes.OK).send(list_instituciones);
  }
}
