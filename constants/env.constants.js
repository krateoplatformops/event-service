module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  SOCKET_URI: process.env.SOCKET_URI,
  LOG_TTL: process.env.LOG_TTL || 3600 * 24 * 7
}
