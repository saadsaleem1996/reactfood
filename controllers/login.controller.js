'use strict'
const LoginService = require('../apiServices/login.service')
const httpCode = require('../utils/httpCodes')
const { responses } = require('../utils/response')

module.exports = {
  login: async (req, res) => {
    try {
      const body = req.body
      const user = await LoginService.login(req, body , res)
      responses(res, user)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  }
}