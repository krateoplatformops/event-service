const express = require('express')
const router = express.Router()
const axios = require('axios')

const { envConstants } = require('../service-library/constants')
const timeHelpers = require('../service-library/helpers/time.helpers')
const axiosHelpers = require('../service-library/helpers/axios.helpers')
const logger = require('../service-library/helpers/logger.helpers')

router.post('/', async (req, res, next) => {
  try {
    const payload = {
      ...req.body
    }
    if (!payload.time) {
      payload.time = timeHelpers.currentTime()
    }
    logger.debug(payload)

    axios
      .post(envConstants.NOTIFICATION_URI, payload)
      .then((response) => {
        logger.debug(response)

        res.status(200).json({ message: 'ok' })
      })
      .catch((err) => {
        logger.silly(err)

        const { status, message } = axiosHelpers.errorHandler(err)

        res.status(status).json({ message })
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router
