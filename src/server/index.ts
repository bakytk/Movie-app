

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.APP_PORT || 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

// const PORT = 3000;
// const express = require("express");
// const app = express();
//
// var router = require('./routes');
// app.use('/', router);
//
// app.listen(PORT, async () => {
//   console.log(`Server up on port: ${PORT}`);
// });
//
// module.exports = app; // for testing
