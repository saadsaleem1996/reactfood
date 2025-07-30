'use strict'
const router = require('express').Router()
const Controller = require('../../controllers/login.controller')
const LoginValidator = require('../../validator/login.validator')
const Validator = require('../../validator/registration.validator')


router.post('/', LoginValidator.body, Validator.validate, Controller.login)
 

module.exports = router