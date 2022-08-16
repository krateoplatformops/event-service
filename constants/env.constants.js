module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  NOTIFICATION_URI: process.env.NOTIFICATION_URI ||
  `http://notification-service.${process.env.NAMESPACE}.svc`,
  LOG_TTL: process.env.LOG_TTL || 3600 * 24 * 7
}
