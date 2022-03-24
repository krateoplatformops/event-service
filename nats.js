const { connect, StringCodec } = require('nats')
const { v4: uuidv4 } = require('uuid')
const { logger } = require('./helpers/logger.helpers')
const { envConstants } = require('./constants')

const subscribe = async () => {
  try {
    const nc = await connect({ servers: envConstants.NATS_URI })
    const sc = StringCodec()

    const sub = nc.subscribe(envConstants.CLOUD_EVENT_SUBJECT)
    for await (const m of sub) {
      const event = JSON.parse(sc.decode(m.data))
      logger.info(`Message received ${JSON.stringify(event.data)}`)

      // TODO: write on mongodb

      if (event.data.socket) {
        const ws = {
          ...event,
          id: uuidv4(),
          type: 'io.krateo.socket',
          data: {
            message: `Hello from server ${event.id}`,
            id: event.id
          }
        }

        await nc.publish(ws.type, sc.encode(JSON.stringify(ws)))
      }
    }

    sub.closed
      .then(() => {
        logger.info('subscription closed')
      })
      .catch((err) => {
        logger.error(`subscription closed with an error ${err.message}`)
      })

    await nc.drain()
  } catch (err) {
    logger.error(`Error on NATS: ${err.message}`)
  }
}

module.exports = {
  subscribe
}
