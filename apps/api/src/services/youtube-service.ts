import { youtubeQueue } from '../queues/youtube-queue.js';
import { auditService } from './audit-service.js';

type PublishInput = {
  userId: string;
  videoId: string;
  visibility: 'PRIVATE' | 'PUBLIC' | 'UNLISTED';
  scheduledAt?: string;
};

export const youtubeService = {
  async enqueueDraft(input: PublishInput) {
    const job = await youtubeQueue.add(
      'draft',
      input,
      {
        jobId: `youtube:draft:${input.videoId}`,
        attempts: 5,
        backoff: { type: 'exponential', delay: 2000 },
      },
    );

    await auditService.log({
      userId: input.userId,
      action: 'youtube.draft.queued',
      entityType: 'video',
      entityId: input.videoId,
      metadata: { jobId: job.id },
    });

    return { jobId: job.id };
  },

  async enqueuePublish(input: PublishInput) {
    const job = await youtubeQueue.add(
      'publish',
      input,
      {
        jobId: `youtube:publish:${input.videoId}`,
        attempts: 5,
        backoff: { type: 'exponential', delay: 2000 },
      },
    );

    await auditService.log({
      userId: input.userId,
      action: 'youtube.publish.queued',
      entityType: 'video',
      entityId: input.videoId,
      metadata: { jobId: job.id },
    });

    return { jobId: job.id };
  },

  async enqueueSchedule(input: PublishInput) {
    const job = await youtubeQueue.add(
      'schedule',
      input,
      {
        jobId: `youtube:schedule:${input.videoId}`,
        attempts: 5,
        backoff: { type: 'exponential', delay: 2000 },
      },
    );

    await auditService.log({
      userId: input.userId,
      action: 'youtube.schedule.queued',
      entityType: 'video',
      entityId: input.videoId,
      metadata: { jobId: job.id },
    });

    return { jobId: job.id };
  },
};
