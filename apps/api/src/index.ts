import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import { loadEnv } from './lib/env.js';
import { logger } from './lib/logger.js';
import { registerHealthRoutes } from './modules/health/routes.js';
import { registerAuthRoutes } from './modules/auth/routes.js';
import { registerUploadRoutes } from './modules/upload/routes.js';
import { registerAiRoutes } from './modules/ai/routes.js';
import { registerYoutubeRoutes } from './modules/youtube/routes.js';
import { registerVideoRoutes } from './modules/video/routes.js';
import { errorHandler } from './middleware/error-handler.js';

const env = loadEnv();

const app = Fastify({ logger });

app.register(cors, {
  origin: [env.WEB_URL],
  credentials: true,
});
app.register(helmet);
app.register(rateLimit, {
  max: 120,
  timeWindow: '1 minute',
});
app.register(cookie, { secret: env.COOKIE_SECRET });
app.register(jwt, { secret: env.JWT_SECRET, cookie: { cookieName: 'session' } });
app.register(multipart, {
  limits: {
    fileSize: env.UPLOAD_MAX_BYTES_FREE,
  },
});

app.setErrorHandler(errorHandler);

app.register(
  async (instance) => {
    registerHealthRoutes(instance);
    registerAuthRoutes(instance);
    registerUploadRoutes(instance);
    registerAiRoutes(instance);
    registerYoutubeRoutes(instance);
    registerVideoRoutes(instance);
  },
  { prefix: '/api/v1' },
);

const start = async () => {
  try {
    await app.listen({ port: env.PORT, host: '0.0.0.0' });
  } catch (error) {
    app.log.error(error, 'server failed to start');
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== 'test') {
  start();
}

export default app;
