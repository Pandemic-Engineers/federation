module.exports = {
    port: 3000,
    MONGODB_ConnectionString: process.env.MONGODB_URL || 'mongodb://localhost:27017/pellar-federation',
    mongodb_name: process.env.MONGODB_NAME || 'pellar-federation',
    MONGODB_POOL_SIZE: process.env.MONGODB_POOL_SIZE || 10,
    APPLICATION_NAME: process.env.APPLICATION_NAME || 'Federation (Development)',
    ERROR_NEW_LINE_SEPARATOR: process.env.ERROR_NEW_LINE_SEPARATOR || `\n`,
    ERROR_LOG_404_ERRORS: process.env.ERROR_LOG_404_ERRORS === 'true' || false,
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET-ABC-DEVELOPMENT',
    SECURITY_JWT_TOKEN_EXPIRES_IN: process.env.SECURITY_JWT_TOKEN_EXPIRES_IN || '7 days',
}
