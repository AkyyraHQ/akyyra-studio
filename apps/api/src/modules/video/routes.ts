import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { requireAuth } from '../../middleware/auth.js';
import { videoService } from '../../services/video-service.js';

const UpdateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  hashtags: z.string().optional(),
  visibility: z.enum(['PRIVATE', 'PUBLIC', 'UNLISTED']).optional(),
});

export const registerVideoRoutes = (app: FastifyInstance) => {
  app.get('/videos', { preHandler: requireAuth }, async (request) => {
    const userId = request.user?.id ?? 'unknown';
    return videoService.listVideos({ userId });
  });

  app.get('/videos/:id', { preHandler: requireAuth }, async (request, reply) => {
    const userId = request.user?.id ?? 'unknown';
    const videoId = (request.params as { id: string }).id;
    const video = await videoService.getVideo({ userId, videoId });
    if (!video) {
      return reply.status(404).send({ error: 'Not found' });
    }
    return video;
  });

  app.patch('/videos/:id', { preHandler: requireAuth }, async (request, reply) => {
    const parsed = UpdateSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid request body' });
    }

    const userId = request.user?.id ?? 'unknown';
    const videoId = (request.params as { id: string }).id;
    const updated = await videoService.updateVideo({ userId, videoId, data: parsed.data });
    return reply.send(updated);
  });
};
