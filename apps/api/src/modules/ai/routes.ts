import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { requireAuth } from '../../middleware/auth.js';
import { aiService } from '../../services/ai-service.js';

const BodySchema = z.object({
  title: z.string().min(1),
  transcript: z.string().optional(),
  prompt: z.string().optional(),
  videoId: z.string().optional(),
});

export const registerAiRoutes = (app: FastifyInstance) => {
  app.post('/ai/generate', { preHandler: requireAuth }, async (request, reply) => {
    const parsed = BodySchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid request body' });
    }

    const userId = request.user?.id ?? 'unknown';
    const job = await aiService.enqueueMetadata({
      userId,
      ...parsed.data,
    });

    return reply.send(job);
  });
};
