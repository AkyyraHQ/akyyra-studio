import IORedis from 'ioredis';
import { loadEnv } from './env.js';

const env = loadEnv();

export const redis = new IORedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});
