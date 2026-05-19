import { nanoid } from 'nanoid';
import { aiQueue } from '../queues/ai-queue.js';
import { auditService } from './audit-service.js';
import { domainEvents } from '../lib/events.js';

type AiInput = {
  userId: string;
  title: string;
  transcript?: string;
  prompt?: string;
  videoId?: string;
};

export const aiService = {
  async enqueueMetadata(input: AiInput) {
    const jobId = input.videoId ? `ai:${input.videoId}` : `ai:${nanoid()}`;
    const job = await aiQueue.add(
      'generate-metadata',
      input,
      {
        jobId,
        attempts: 5,
        backoff: { type: 'exponential', delay: 1500 },
      },
    );

    await auditService.log({
      userId: input.userId,
      action: 'ai.queued',
      entityType: 'video',
      entityId: input.videoId,
      metadata: { jobId: job.id },
    });

    if (input.videoId) {
      domainEvents.emit('video.processing', { videoId: input.videoId, userId: input.userId });
    }

    return { jobId: job.id };
  },
};
