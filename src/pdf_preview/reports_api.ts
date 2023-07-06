import { DeclaracionRepository } from '../db/repositories/declaracion_repo';
import Express from 'express';
import JWTMiddleware from 'express-jwt';
import ReportsClient from './reports_client';
import { StatusCodes } from 'http-status-codes';

// import {Escolaridad} from '../types/output/declaraciones';
// import { EscolaridadSchema } from '../db/schemas/escolaridad';

export default class ReportsAPI {
  private router: Express.Router;

  public constructor() {
    this.router = Express.Router();
    this.router.get(
      '/declaracion-preview/:id/:publica',
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

    // let escolaridades: any;
    // if(declaracion.datosCurricularesDeclarante){
    //   escolaridades = declaracion.datosCurricularesDeclarante.escolaridad;
    //   if(escolaridades) {
    //     for(let i=0;i < escolaridades.length; i++) {
    //       const e = escolaridades[i];
    //       if(!e || !e.institucionEducativa)
    //         continue;

    //       for(let j = i + 1;j < escolaridades.length;j++){
    //         let e2 = escolaridades[j];
    //         if(!e2 || !e2.institucionEducativa)
    //           continue;

    //         if(e.institucionEducativa.nombre == e2.institucionEducativa.nombre &&  
    //           e.carreraAreaConocimiento == e2.carreraAreaConocimiento) {
    //           escolaridades[j] = undefined;
    //         }
    //       }
    //     }
    //   }
    // }

    try {
      // console.log("Parametros:");
      // console.log(req.params);

      let responsePreview;
      if(req.params.publica === "true"){
        responsePreview = await ReportsClient.getDeclaracionPublica(declaracion);
      }
      else{
        responsePreview = await ReportsClient.getReport(declaracion);
      }

      res.contentType('application/pdf');
      res.setHeader('Access-Control-Allow-Origin', '*');

      return res.status(StatusCodes.OK).send(responsePreview);
    } catch(err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: err,
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
