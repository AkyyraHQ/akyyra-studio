export type StoredUpload = {
  path: string;
  bytes: number;
};

export type SaveUploadInput = {
  uploadId: string;
  filename: string;
  stream: NodeJS.ReadableStream;
  mimeType: string;
};

export interface StorageProvider {
  saveUpload(input: SaveUploadInput): Promise<StoredUpload>;
  cleanupExpired(): Promise<number>;
}
