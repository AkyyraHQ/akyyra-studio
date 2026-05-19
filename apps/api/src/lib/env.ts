import { config } from 'dotenv';
import { z } from 'zod';

config();

const schema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(4000),
  WEB_URL: z.string().url(),
  API_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_REDIRECT_URI: z.string().url(),
  YOUTUBE_CLIENT_ID: z.string().min(1),
  YOUTUBE_CLIENT_SECRET: z.string().min(1),
  YOUTUBE_REDIRECT_URI: z.string().url(),
  JWT_SECRET: z.string().min(32),
  COOKIE_SECRET: z.string().min(32),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  GEMINI_API_KEY: z.string().min(1),
  UPLOAD_TMP_DIR: z.string().min(1),
  UPLOAD_MAX_BYTES_FREE: z.coerce.number().default(2147483648),
  UPLOAD_MAX_BYTES_PRO: z.coerce.number().default(5368709120),
  UPLOAD_CLEANUP_HOURS: z.coerce.number().default(24),
});

export type Env = z.infer<typeof schema>;

export const loadEnv = (): Env => {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);
    throw new Error(`Invalid environment configuration: ${issues.join(', ')}`);
  }
  return parsed.data;
};
