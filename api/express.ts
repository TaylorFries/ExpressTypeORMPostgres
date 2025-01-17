import 'dotenv/config.js';
import express, { RequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import constants from './constants';
import headerHandler from './middleware/headerHandler';
import router from './routes';

const app: express.Application = express();

const { TESTING, BACKEND_URL, FRONTEND_URL } = constants;

// Swagger Configuration
const swaggerURL = `${BACKEND_URL}/api`;
const OPENAPI_OPTIONS = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ExpressPrismaPostgres Test',
      version: '1.0.0',
      description: '',
    },
    servers: [{ url: swaggerURL }],
  },
  apis: ['./docs/*.yaml'],
};

// Express Rate Limiter Configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// CORS Configuration
// Localhost does not need to be specified.
const corsOptions = {
  origin: [
    'http://localhost:8080', // Local frontend testing
    FRONTEND_URL, // Frontend
  ],
  credentials: true,
};

// Incoming CORS Filter
app.use(cors(corsOptions));

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev')); // logging middleware

// Set headers for response
app.use('/api', headerHandler as RequestHandler);

// Use rate limiter if not testing
if (!TESTING) app.use(limiter);

// Swagger service route
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(OPENAPI_OPTIONS)));

// Add router
app.use('/api', router.healthRouter);
app.use('/api', router.characterRouter);
app.use('/api', router.seriesRouter);

export default app;
