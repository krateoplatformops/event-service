const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { dbConstants, envConstants } = require('../constants')

const logSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  level: {
    type: String,
    required: true,
    enum: ['error', 'warning', 'info', 'debug'],
    default: 'info'
  },
  reason: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  deploymentId: {
    type: String,
    required: true
  }
})

logSchema.index(
  { time: 1, deploymentId: 1 },
  { name: 'logIndex', expireAfterSeconds: envConstants.LOG_TTL }
)

module.exports = mongoose.model('Log', logSchema, dbConstants.COLLECTION_LOG)
