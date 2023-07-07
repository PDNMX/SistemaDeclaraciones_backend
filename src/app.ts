import 'reflect-metadata';
import { EnvironmentConfig, corsOptions } from './config';
import { ApiRouter } from './routers/api';
//import BodyParser from 'body-parser';
import Cors from 'cors';
import DBConnection from './db/connection';
//import Express from 'express';
import GraphqlAPI from './graphql';
import ReportsAPI from './pdf_preview/reports_api';
// import Sendgrid from '@sendgrid/mail';
import path from 'path';
import Express, { RequestHandler } from 'express';

class App {
  private static instance: App;
  private app: Express.Application;

  private constructor() {
    this.app = Express();
    this.applyMiddlewares();
  }

  /*
   * Creates the express application.
   * @return {Express.Application}
   */
  public static async create(): Promise<Express.Application> {
    if (!App.instance) {
      EnvironmentConfig.build();
      App.instance = new App();

      ApiRouter.create(App.instance.app);
      // Sendgrid.setApiKey(`${process.env.SENDGRID_API_KEY}`);
      ReportsAPI.create(App.instance.app);

      await GraphqlAPI.create(App.instance.app);

      //16-05-2023: Intentar conectar a la bd
      var conectado = false;
      while(!conectado) {
        console.log("Conectando a la base de datos...");
        try{
          await DBConnection.connect();
          conectado = true;
        }
        catch(e){
          console.log("Error al conectarse a la base de datos, intentando nuevamente");
        }

        //esperar 5 segundos
        await new Promise(f => setTimeout(f, 5000));
      }
    }

    return App.instance.app;
  }

  /*
   * Function to attach middlewares to the application.
   */
  private applyMiddlewares(): void {
    
    // Enable CORS
    this.app.options('*', Cors(corsOptions));
    this.app.use('*', Cors(corsOptions));

    var parser = Express.urlencoded({extended: false}) as RequestHandler;
    // parse application/x-www-form-urlencoded
    //this.app.use(BodyParser.urlencoded({ extended: false }));
    this.app.use(parser);

    // To mount static files
    // TODO: This does not work
    this.app.use('/static', Express.static(path.join(__dirname,'./static')));

    // parse application/json
    //this.app.use(BodyParser.json());
    //this.app.use(express.json());
    this.app.use(Express.json() as RequestHandler);
  }
}

export default App;
