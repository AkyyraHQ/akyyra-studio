import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { requireAuth } from '../../middleware/auth.js';
import { uploadService } from '../../services/upload-service.js';

const UploadQuerySchema = z.object({
  filename: z.string().min(1),
});

export const registerUploadRoutes = (app: FastifyInstance) => {
  app.post('/uploads', { preHandler: requireAuth }, async (request, reply) => {
    const parsed = UploadQuerySchema.safeParse(request.query);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid upload parameters' });
    }

    const file = await request.file();
    if (!file) {
      return reply.status(400).send({ error: 'No file provided' });
    }

    const userId = request.user?.id ?? 'unknown';
    const result = await uploadService.handleUpload({
      userId,
      filename: parsed.data.filename,
      stream: file.file,
      mimeType: file.mimetype,
    });

    return reply.send(result);
  });
};
