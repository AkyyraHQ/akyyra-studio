import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { requireAuth } from '../../middleware/auth.js';
import { youtubeService } from '../../services/youtube-service.js';

const PublishSchema = z.object({
  videoId: z.string().min(1),
  visibility: z.enum(['PRIVATE', 'PUBLIC', 'UNLISTED']).default('PRIVATE'),
  scheduledAt: z.string().datetime().optional(),
});

export const registerYoutubeRoutes = (app: FastifyInstance) => {
  app.post('/youtube/draft', { preHandler: requireAuth }, async (request, reply) => {
    const parsed = PublishSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid request body' });
    }

    const userId = request.user?.id ?? 'unknown';
    const job = await youtubeService.enqueueDraft({ userId, ...parsed.data });
    return reply.send(job);
  });

  app.post('/youtube/publish', { preHandler: requireAuth }, async (request, reply) => {
    const parsed = PublishSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid request body' });
    }

    const userId = request.user?.id ?? 'unknown';
    const job = await youtubeService.enqueuePublish({ userId, ...parsed.data });
    return reply.send(job);
  });

  app.post('/youtube/schedule', { preHandler: requireAuth }, async (request, reply) => {
    const parsed = PublishSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid request body' });
    }

    const userId = request.user?.id ?? 'unknown';
    const job = await youtubeService.enqueueSchedule({ userId, ...parsed.data });
    return reply.send(job);
  });
};
