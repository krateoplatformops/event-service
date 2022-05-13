const express = require('express')
const router = express.Router()

router.get('/ping', (req, res) => {
  res.status(200).send('Log Service')
})

router.get('/healthz', (req, res) => {
  res.status(200).send('Log Service')
})

module.exports = router
