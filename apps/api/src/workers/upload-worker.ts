import { Worker } from 'bullmq';
import { redis } from '../lib/redis.js';
import { auditService } from '../services/audit-service.js';
import { videoService } from '../services/video-service.js';
import { domainEvents } from '../lib/events.js';

export const uploadWorker = new Worker(
  'uploadQueue',
  async (job) => {
    const { userId, videoId } = job.data;
    const locked = await videoService.lockProcessing({
      videoId,
      lockId: `upload:${job.id}`,
    });

    if (!locked) {
      return { status: 'already_processing' };
    }

    await videoService.updateVideo({
      userId,
      videoId,
      data: { status: 'PROCESSING' },
    });
    await auditService.log({
      userId,
      action: 'upload.processing',
      entityType: 'video',
      entityId: videoId,
      metadata: { jobId: job.id },
    });

    domainEvents.emit('video.processing', { videoId, userId });
    return { status: 'queued_for_youtube' };
  },
  { connection: redis },
);
