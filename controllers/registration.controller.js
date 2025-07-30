'use strict'
const RegistrationService = require('../apiServices/register.service')
const httpCode = require('../utils/httpCodes')
const { responses } = require('../utils/response')

module.exports = {
  register: async (req, res) => {
    try {
      const body = req.body
      const user = await RegistrationService.register(req, body)
      responses(res, user)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  }
}