'use strict'
const router = require('express').Router()
const Controller = require('../../controllers/registration.controller')
const Validator = require('../../validator/registration.validator')


router.post('/', Validator.body, Validator.validate, Controller.register)
 

module.exports = router