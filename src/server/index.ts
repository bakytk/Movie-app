

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
import {router} from './routes';
app.use('/', router);

const PORT = process.env.APP_PORT || 4000;

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });
//
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
// });


app.listen(PORT, async () => {
  console.log(`Server up on port: ${PORT}`);
});

// for testing
export { app };
