import type { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma.js';
import { redis } from '../../lib/redis.js';

export const registerHealthRoutes = (app: FastifyInstance) => {
  app.get('/health', async () => ({ status: 'ok' }));

  app.get('/health/db', async () => {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'ok' };
  });

  app.get('/health/redis', async () => {
    await redis.ping();
    return { status: 'ok' };
  });
};
