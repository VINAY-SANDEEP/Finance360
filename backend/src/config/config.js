// Database & environment configuration module (Phase 2)
export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/finance360',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_key_360',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};
