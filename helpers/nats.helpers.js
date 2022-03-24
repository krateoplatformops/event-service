const { connect, StringCodec } = require('nats')
const { logger } = require('./logger.helpers')
const { envConstants, nodeConstants } = require('../constants')

let nc = null

const subscribe = async (ee) => {
  try {
    logger.info('Connecting to NATS')
    nc = await connect({ servers: envConstants.NATS_URI })
    logger.info('Connected to NATS')

    const sc = StringCodec()

    const sub = nc.subscribe(envConstants.CLOUD_EVENT_SUBJECT)

    for await (const m of sub) {
      const event = JSON.parse(sc.decode(m.data))
      logger.debug(`NATS - Message received ${JSON.stringify(event.data)}`)

      ee.emit(nodeConstants.EVENT_EMITTER, event.data)
    }
  } catch (err) {
    logger.error(`Error on NATS: ${err.message}`)
  }
}

const publish = async (event) => {
  if (nc) {
    await nc.publish(event.type, sc.encode(JSON.stringify(event)))
  } else {
    logger.error('NATS is not connected')
  }
}

module.exports = {
  subscribe,
  publish
}
