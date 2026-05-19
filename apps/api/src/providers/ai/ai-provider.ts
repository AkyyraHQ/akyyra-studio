export type AiMetadataResult = {
  titles: string[];
  description: string;
  hashtags: string[];
};

export interface AIProvider {
  generateMetadata(input: {
    title: string;
    transcript?: string;
    prompt?: string;
  }): Promise<AiMetadataResult>;
}
