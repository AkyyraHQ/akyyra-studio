import { Worker } from 'bullmq';
import { redis } from '../lib/redis.js';
import { storageProvider } from '../providers/storage/local-storage.js';

export const cleanupWorker = new Worker(
  'cleanupQueue',
  async () => {
    const removed = await storageProvider.cleanupExpired();
    return { removed };
  },
  { connection: redis },
);
