'use strict'
const router = require('express').Router()
const Controller = require('../../controllers/profile.controller')
const TokenValidator = require('../../middleWares/auth')
const PasswordValidator = require('../../validator/resetPassword.validator')


router.get('/',TokenValidator, Controller.getProfile)

router.put('/update',TokenValidator, Controller.updateProfile)

router.delete('/delete',TokenValidator, Controller.deleteProfile)

router.post('/changePassword', TokenValidator, PasswordValidator.body, Controller.changePassword)


module.exports = router