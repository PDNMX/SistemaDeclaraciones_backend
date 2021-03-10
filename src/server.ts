import App from './app';
import dotenv from 'dotenv';

/*
 * Entry point of the application. It starts the Server.
 */
async function main(): Promise<void> {
  dotenv.config();

  const PORT = process.env.PORT;
  const app = await App.create();
  await app.listen(PORT);

  console.log(`Server is running on port = ${PORT}`);
}

if (require.main === module) {
  main();
}
