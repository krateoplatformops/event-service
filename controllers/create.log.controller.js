const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Endpoint = mongoose.model('Endpoint')
const timeHelpers = require('../helpers/time.helpers')
const uriHelpers = require('../helpers/uri.helpers')

router.post('/', async (req, res, next) => {
  try {
    const payload = {
      ...req.body
    }
    if (!payload.time) {
      payload.time = timeHelpers.currentTime()
    }
    Log.create(log)
      .then((endpoint) => {
        res.status(200).json(log)
      })
      .catch((error) => {
        next(error)
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router
