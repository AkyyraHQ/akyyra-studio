export type VideoStatus =
  | 'PENDING'
  | 'UPLOADING'
  | 'PROCESSING'
  | 'AI_GENERATING'
  | 'READY'
  | 'SCHEDULED'
  | 'PUBLISHED'
  | 'FAILED';

export type VideoVisibility = 'PRIVATE' | 'PUBLIC' | 'UNLISTED';

export type UserTier = 'FREE' | 'PRO';

export type AiMetadataPayload = {
  titles: string[];
  description: string;
  hashtags: string[];
};
