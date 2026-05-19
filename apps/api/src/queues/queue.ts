import { Queue } from 'bullmq';
import { redis } from '../lib/redis.js';

export const createQueue = (name: string) =>
  new Queue(name, {
    connection: redis,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: true,
      removeOnFail: false,
    },
  });
