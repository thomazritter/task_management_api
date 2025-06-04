import Sentry from './sentry.js';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import Router from './routes/router.js';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sequelize from './connections/database.js';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });

// Use correct Sentry handler references for ESM
app.use(
  Sentry.defaultHandlers?.requestHandler?.() ||
    Sentry.Handlers?.requestHandler?.() ||
    ((req, res, next) => next())
);
app.use(
  Sentry.defaultHandlers?.tracingHandler?.() ||
    Sentry.Handlers?.tracingHandler?.() ||
    ((req, res, next) => next())
);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', Router.getRouter());

const swaggerDocument = yaml.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
  const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}`;
  console.log(logMessage);
  logStream.write(logMessage + '\n');
  next();
});

app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!');
});

await sequelize.sync();

// Sentry error handler must be after all routes/middleware
app.use(
  Sentry.defaultHandlers?.errorHandler?.() ||
    Sentry.Handlers?.errorHandler?.() ||
    ((err, req, res, next) => next(err))
);

// Optional: fallback error handler for user-friendly messages
app.use((err, req, res, next) => {
  res.statusCode = 500;
  res.end(res.sentry ? `Sentry Error ID: ${res.sentry}` : 'Internal server error');
});

export default app;