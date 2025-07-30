'use strict'
const OrderService = require('../apiServices/orders.service')
const httpCode = require('../utils/httpCodes')
const { responses } = require('../utils/response')

module.exports = {
  createOrders: async (req, res) => {
    try {
      const body = req.body
      const user = await OrderService.createOrder(req, body , res)
      responses(res, user)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },

  updateOrders: async (req, res) => {
    try {
      const body = req.body
      const user = await OrderService.updateOrder(req, body , res)
      responses(res, user)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
}