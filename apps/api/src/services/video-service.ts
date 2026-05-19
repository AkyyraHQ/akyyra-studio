import { prisma } from '../lib/prisma.js';

type CreateVideoInput = {
  userId: string;
  filename?: string;
  status?: 'PENDING' | 'UPLOADING' | 'PROCESSING' | 'AI_GENERATING' | 'READY' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED';
};

type UpdateVideoInput = {
  userId: string;
  videoId: string;
  data: {
    title?: string;
    description?: string;
    hashtags?: string;
    visibility?: 'PRIVATE' | 'PUBLIC' | 'UNLISTED';
  };
};

export const videoService = {
  createVideo(input: CreateVideoInput) {
    return prisma.video.create({
      data: {
        userId: input.userId,
        filename: input.filename,
        status: input.status,
      },
    });
  },

  listVideos(input: { userId: string }) {
    return prisma.video.findMany({
      where: { userId: input.userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  },

  getVideo(input: { userId: string; videoId: string }) {
    return prisma.video.findFirst({
      where: { id: input.videoId, userId: input.userId, deletedAt: null },
    });
  },

  updateVideo(input: UpdateVideoInput) {
    return prisma.video.update({
      where: { id: input.videoId },
      data: input.data,
    });
  },

  async lockProcessing(input: { videoId: string; lockId: string }) {
    const result = await prisma.video.updateMany({
      where: {
        id: input.videoId,
        processingLock: null,
      },
      data: {
        processingLock: input.lockId,
        processingStartedAt: new Date(),
      },
    });
    return result.count === 1;
  },
};
