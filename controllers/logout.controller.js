'use strict'
const LogoutService = require('../apiServices/logout.service')
const httpCode = require('../utils/httpCodes')
const { responses } = require('../utils/response')

module.exports = {
  logout: async (req, res) => {
    try {
      const user = await LogoutService.logout(req, res)
      responses(res, user)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  }
}