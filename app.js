const express = require('express')
const helmet = require('helmet')
const { nodeConstants } = require('./constants')
const cors = require('cors')({ origin: true, credentials: true })
const EventEmitter = require('events')
const nats = require('./helpers/nats.helpers')

const app = express()
app.use(helmet())
app.use(cors)

/* Routes */
const baseRoute = require('./routes/base')
app.use('/', baseRoute)

/* NATS */
const ee = new EventEmitter()
nats.subscribe(ee)

ee.on(nodeConstants.EVENT_EMITTER, (text) => {
  // message received
  // write to mongodb
  //delivery to ws if socket is present
  // nats.publish()
})

module.exports = app
