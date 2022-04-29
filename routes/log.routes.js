const express = require('express')
const router = express.Router()

const createController = require('../controllers/create.log.controller')
const readController = require('../controllers/read.log.controller')

router.use('/', createController)
router.use('/', readController)

module.exports = router
