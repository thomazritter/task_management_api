import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import Router from './routes/router.js';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', Router.getRouter());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
  const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}`;
  console.log(logMessage);
  logStream.write(logMessage + '\n');
  next();
});

app.listen(port, () => {
  console.log(`Task Management API is running on port ${port}`);
});

export default app;
