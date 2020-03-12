module.exports = {
    MONGODB_ConnectionString: process.env.MONGODB_URL || 'mongodb://localhost:27017/pellar-federation',
    mongodb_name: process.env.MONGODB_NAME || 'pellar-federation',
    MONGODB_POOL_SIZE: process.env.MONGODB_POOL_SIZE || 10,
    APPLICATION_NAME: process.env.APPLICATION_NAME || 'Federation (Production)',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET-PELLAR-PRODUCTION',
    SECURITY_JWT_TOKEN_EXPIRES_IN: process.env.SECURITY_JWT_TOKEN_EXPIRES_IN || '7 days',
  }
