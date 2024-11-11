import 'reflect-metadata';
import { EnvironmentConfig, corsOptions } from './config';
import { ApiRouter } from './routers/api';
import BodyParser from 'body-parser';
import Cors from 'cors';
import DBConnection from './db/connection';
import Express from 'express';
import GraphqlAPI from './graphql';
import InstitucionesAPI from './routers/instituciones_api';
import ReportsAPI from './pdf_preview/reports_api';
//import Sendgrid from '@sendgrid/mail';
import path from 'path';

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
      //Sendgrid.setApiKey(`${process.env.SENDGRID_API_KEY}`);
      ReportsAPI.create(App.instance.app);
      InstitucionesAPI.create(App.instance.app);

      await GraphqlAPI.create(App.instance.app);
      await DBConnection.connect();
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

    // parse application/x-www-form-urlencoded
    this.app.use(BodyParser.urlencoded({ extended: false }));

    // To mount static files
    this.app.use('/static', Express.static(path.join(__dirname, './static')));

    // parse application/json
    this.app.use(BodyParser.json());
  }
}

export default App;
