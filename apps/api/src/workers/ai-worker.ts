import { Worker } from 'bullmq';
import { redis } from '../lib/redis.js';
import { geminiProvider } from '../providers/ai/gemini-provider.js';
import { auditService } from '../services/audit-service.js';
import { domainEvents } from '../lib/events.js';

export const aiWorker = new Worker(
  'aiQueue',
  async (job) => {
    const { userId, title, transcript, prompt, videoId } = job.data;
    const result = await geminiProvider.generateMetadata({ title, transcript, prompt });
    await auditService.log({
      userId,
      action: 'ai.generated',
      entityType: 'video',
      entityId: videoId,
      metadata: { jobId: job.id },
    });
    if (videoId) {
      domainEvents.emit('video.ai.generated', { videoId, userId });
    }
    return result;
  },
  {
    connection: redis,
  },
);
