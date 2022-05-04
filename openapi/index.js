const m2s = require('mongoose-to-swagger')
const mongoose = require('mongoose')
const Log = mongoose.model('Log')

const log = require('./paths/log')
const responseSchema = require('./schemas/response.schema')

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Krateo Log Service API',
    description: 'Log Service API for Krateo',
    version: '1.0.0',
    contact: {
      name: 'Krateo PlatformOps',
      email: 'contact@krateoplatformops.io',
      url: 'https://krateo.io'
    }
  },
  paths: {
    '/': {
      get: log.get,
      post: log.post
    }
  },
  components: {
    schemas: {
      Log: m2s(Log),
      Response: responseSchema
    }
  }
}
