import { nanoid } from 'nanoid';
import { prisma } from '../lib/prisma.js';
import { storageProvider } from '../providers/storage/local-storage.js';
import { uploadQueue } from '../queues/upload-queue.js';
import { videoService } from './video-service.js';
import { auditService } from './audit-service.js';
import { domainEvents } from '../lib/events.js';

type UploadInput = {
  userId: string;
  filename: string;
  stream: NodeJS.ReadableStream;
  mimeType: string;
};

export const uploadService = {
  async handleUpload(input: UploadInput) {
    const uploadId = nanoid();
    const stored = await storageProvider.saveUpload({
      uploadId,
      filename: input.filename,
      stream: input.stream,
      mimeType: input.mimeType,
    });

    const video = await videoService.createVideo({
      userId: input.userId,
      filename: input.filename,
      status: 'UPLOADING',
    });

    await uploadQueue.add(
      'upload',
      {
        userId: input.userId,
        videoId: video.id,
        uploadId,
        filePath: stored.path,
      },
      {
        jobId: `upload:${video.id}`,
        attempts: 5,
        backoff: { type: 'exponential', delay: 1000 },
      },
    );

    await auditService.log({
      userId: input.userId,
      action: 'upload.received',
      entityType: 'video',
      entityId: video.id,
      metadata: { filename: input.filename },
    });

    domainEvents.emit('video.uploaded', { videoId: video.id, userId: input.userId });

    return { uploadId, videoId: video.id };
  },
};
