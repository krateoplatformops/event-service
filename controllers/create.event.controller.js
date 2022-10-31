const express = require('express')
const router = express.Router()
const axios = require('axios')

const { envConstants } = require('../service-library/constants')
const timeHelpers = require('../service-library/helpers/time.helpers')
const axiosHelpers = require('../service-library/helpers/axios.helpers')
const logger = require('../service-library/helpers/logger.helpers')

router.post('/', async (req, res, next) => {
  try {
    const b = req.body
    const payload = {
      message: b.message,
      time: b.time,
      level: b.type.toLowerCase(),
      reason: 'CreatedExternalResource',
      source: b.source,
      deploymentId: b.deploymentId
    }
    if (!payload.time) {
      payload.time = timeHelpers.currentTime()
    }
    logger.info(payload)
    // console.log('##############################')
    // console.log(payload)
    // console.log('##############################')
    // logger.fatal('fatal')
    // logger.error('error')
    // logger.warn('warn')
    // logger.info('info')
    // logger.debug('debug')
    // logger.trace('trace')

    axios
      .post(envConstants.NOTIFICATION_URI, payload)
      .then((response) => {
        logger.debug(response.data)

        res.status(200).json({ message: 'ok' })
      })
      .catch((err) => {
        logger.error(err)

        const { status, message } = axiosHelpers.errorHandler(err)

        res.status(status).json({ message })
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router
