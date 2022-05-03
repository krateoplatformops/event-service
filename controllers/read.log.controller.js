const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Log = mongoose.model('Log')

router.get('/', async (req, res, next) => {
  try {
    try {
      Log.find(req.query).exec((error, logs) => {
        if (error) {
          next(error)
        } else {
          res.status(200).json(logs)
        }
      })
    } catch (error) {
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
