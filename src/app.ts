import 'reflect-metadata';
import DBConnection from './db/Connection';
import Express from 'express';
import GraphqlAPI from './graphql';
import bodyParser from 'body-parser';
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
      App.instance = new App();

      await GraphqlAPI.create(App.instance.app);
      await DBConnection.connect();
    }

    return App.instance.app;
  }

  /*
   * Function to attach middlewares to the application.
   */
  private applyMiddlewares(): void {
    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // To mount static files
    console.log(path.join(__dirname,'./public'));
    console.log(Express.static(path.join(__dirname,'./public')));

    this.app.use(Express.static(path.join(__dirname,'./public')));

    // parse application/json
    this.app.use(bodyParser.json());
  }
}

export default App;
