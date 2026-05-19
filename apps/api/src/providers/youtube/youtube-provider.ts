export interface VideoPlatformProvider {
  createDraft(input: { videoId: string }): Promise<{ youtubeId: string }>;
  publish(input: { videoId: string; scheduledAt?: string }): Promise<{ youtubeId: string }>;
}
