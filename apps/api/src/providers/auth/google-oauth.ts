import type { AuthProvider } from './auth-provider.js';

export const googleAuthProvider: AuthProvider = {
  getAuthorizationUrl() {
    return '';
  },
  async exchangeCode() {
    return { accessToken: '', refreshToken: '', expiryDate: new Date() };
  },
};
