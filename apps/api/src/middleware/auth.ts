import type { FastifyReply, FastifyRequest } from 'fastify';

export const requireAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch (_error) {
    if (process.env.NODE_ENV === 'development') {
      const devUserId = request.headers['x-user-id'];
      if (typeof devUserId === 'string' && devUserId.length > 0) {
        request.user = { id: devUserId };
        return;
      }
    }
    reply.status(401).send({ error: 'Unauthorized' });
  }
};
