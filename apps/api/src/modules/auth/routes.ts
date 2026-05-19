import type { FastifyInstance } from 'fastify';

export const registerAuthRoutes = (app: FastifyInstance) => {
  app.get('/auth/google', async () => ({ status: 'not_implemented' }));
  app.get('/auth/google/callback', async () => ({ status: 'not_implemented' }));
};
