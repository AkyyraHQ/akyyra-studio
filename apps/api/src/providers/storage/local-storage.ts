import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { loadEnv } from '../../lib/env.js';
import type { SaveUploadInput, StorageProvider } from './storage-provider.js';

const env = loadEnv();

const ensureDir = async (dir: string) => {
  await fs.promises.mkdir(dir, { recursive: true });
};

export const storageProvider: StorageProvider = {
  async saveUpload(input: SaveUploadInput) {
    await ensureDir(env.UPLOAD_TMP_DIR);
    const filePath = path.join(env.UPLOAD_TMP_DIR, `${input.uploadId}-${input.filename}`);

    let bytes = 0;
    input.stream.on('data', (chunk) => {
      bytes += chunk.length;
    });

    await pipeline(input.stream, fs.createWriteStream(filePath));

    return { path: filePath, bytes };
  },

  async cleanupExpired() {
    await ensureDir(env.UPLOAD_TMP_DIR);
    const files = await fs.promises.readdir(env.UPLOAD_TMP_DIR);
    const now = Date.now();
    let removed = 0;

    await Promise.all(
      files.map(async (file) => {
        const fullPath = path.join(env.UPLOAD_TMP_DIR, file);
        const stat = await fs.promises.stat(fullPath);
        const ageHours = (now - stat.mtimeMs) / 1000 / 60 / 60;
        if (ageHours >= env.UPLOAD_CLEANUP_HOURS) {
          await fs.promises.unlink(fullPath);
          removed += 1;
        }
      }),
    );

    return removed;
  },
};
