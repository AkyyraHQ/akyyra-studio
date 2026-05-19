import { Worker } from 'bullmq';
import { redis } from '../lib/redis.js';
import { auditService } from '../services/audit-service.js';
import { youtubeQuotaService } from '../services/youtube-quota-service.js';

export const youtubeWorker = new Worker(
  'youtubeQueue',
  async (job) => {
    const { userId, videoId } = job.data;
    await youtubeQuotaService.incrementUnits(1);
    await auditService.log({
      userId,
      action: 'youtube.job.processed',
      entityType: 'video',
      entityId: videoId,
      metadata: { jobId: job.id, type: job.name },
    });
    return { status: 'queued' };
  },
  { connection: redis },
);
