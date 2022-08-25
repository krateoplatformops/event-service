const express = require('express')
const router = express.Router()

const createController = require('../controllers/create.event.controller')
const readController = require('../controllers/read.event.controller')

router.use('/', createController)
router.use('/', readController)

module.exports = router
