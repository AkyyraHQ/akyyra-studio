export interface AuthProvider {
  getAuthorizationUrl(): string;
  exchangeCode(code: string): Promise<{ accessToken: string; refreshToken: string; expiryDate: Date }>;
}
