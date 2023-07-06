import mongoose from 'mongoose';
mongoose.Promise = global.Promise;


class DBConnection {
  private static hasBeenConnected = false;

  private static buildURI(): string {
    const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
    const MONGO_PORT = process.env.MONGO_PORT;
    const MONGO_DB = process.env.MONGO_DB;
    const MONGO_USERNAME = process.env.MONGO_USERNAME;
    const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

    return `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
  }

  public static async connect(): Promise<void> {
    if (!DBConnection.hasBeenConnected) {
      const uri = DBConnection.buildURI();
      const options = {
        useNewUrlParser: true,
        // Mongoose will automatically build indexes defined in your schema when it connects.
        autoIndex: true,
        // Set to true to make Mongoose's default index build use
        useCreateIndex: true,
        // The maximum number of sockets the MongoDB driver will keep open for this connection.
        poolSize: 10,
        useUnifiedTopology: true,
        useFindAndModify: false,
      };

      try {
        await mongoose.connect(uri, options);
        console.log('MongoDB is connected.');
        DBConnection.hasBeenConnected = true;
      } catch(err) {
        console.log("Error al conectarse a la base de datos");
        console.log(err);
      }
    }
  }
}

export default DBConnection;
