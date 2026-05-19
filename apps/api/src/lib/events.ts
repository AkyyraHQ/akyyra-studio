import { EventEmitter } from 'node:events';

export type DomainEvent =
  | 'video.uploaded'
  | 'video.processing'
  | 'video.failed'
  | 'video.ai.generated';

export const domainEvents = new EventEmitter();
