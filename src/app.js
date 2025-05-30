import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import Router from './routes/router.js';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', Router.getRouter());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

console.log('Task Management API running at port:', port);

export default app;
