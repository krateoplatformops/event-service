const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const envConstants = require('../constants/env.constants')

const Log = mongoose.model('Log')
const timeHelpers = require('../helpers/time.helpers')
const axios = require('axios')
const { logger } = require('../helpers/logger.helpers')

router.post('/', async (req, res, next) => {
  try {
    const payload = {
      ...req.body
    }
    if (!payload.time) {
      payload.time = timeHelpers.currentTime()
    }
    Log.create(payload)
      .then(async (doc) => {
        if (req.body.transactionId) {
          const resp = await axios.post(envConstants.SOCKET_URI, doc)
          logger.debug(resp)
        }

        res.status(200).json(doc)
      })
      .catch((error) => {
        next(error)
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router
