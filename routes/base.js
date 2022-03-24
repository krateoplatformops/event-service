const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('Krateo Service Logger')
})

router.get('/ping', (req, res) => {
  res.status(200).send('Krateo Service Logger')
})

module.exports = router
