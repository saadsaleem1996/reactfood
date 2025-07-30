'use strict'
const router = require('express').Router()
const Controller = require('../../controllers/logout.controller')
const TokenValidator = require('../../middleWares/auth')

router.post('/', TokenValidator, Controller.logout)
 
module.exports = router