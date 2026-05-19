import type { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export const errorHandler: FastifyInstance['errorHandler'] = (
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  const statusCode = error.statusCode ?? 500;
  reply.status(statusCode).send({
    error: statusCode >= 500 ? 'Internal Server Error' : error.message,
  });
};
