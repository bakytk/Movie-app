

import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
import {router} from './routes';
app.use('/', router);

const PORT = process.env.APP_PORT || 4000;
app.listen(PORT, async () => {
  console.log(`Server up on port: ${PORT}`);
});

// for testing
export { app };
