import type { VideoPlatformProvider } from './youtube-provider.js';

export const youtubeProvider: VideoPlatformProvider = {
  async createDraft() {
    return { youtubeId: '' };
  },
  async publish() {
    return { youtubeId: '' };
  },
};
