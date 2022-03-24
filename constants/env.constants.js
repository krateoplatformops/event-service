module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI,
  NATS_URI: process.env.NATS_URI,
  CLOUD_EVENT_SUBJECT: process.env.CLOUD_EVENT_SUBJECT || 'io.krateo.logger',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
}
