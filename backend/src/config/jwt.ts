export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-fallback-secret-key',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};