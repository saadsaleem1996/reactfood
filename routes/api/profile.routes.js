'use strict'
const router = require('express').Router()
const Controller = require('../../controllers/profile.controller')
const TokenValidator = require('../../middleWares/auth')
const PasswordValidator = require('../../validator/resetPassword.validator')


router.get('/',TokenValidator, Controller.getProfile)

router.put('/',TokenValidator, Controller.updateProfile)

router.delete('/',TokenValidator, Controller.deleteProfile)

router.post('/', TokenValidator, PasswordValidator.body, Controller.changePassword)


module.exports = router