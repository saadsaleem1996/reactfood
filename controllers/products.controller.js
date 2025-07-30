'use strict'
const ProcuctService = require('../apiServices/products.service')
const httpCode = require('../utils/httpCodes')
const { responses } = require('../utils/response')

module.exports = {
  createProducts: async (req, res) => {
    try {
      const body = req.body
      console.log("req in the controllwe", body)
      const user = await ProcuctService.createProduct(req, body , res)
      responses(res, user)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
  updateProduct: async (req, res) => {
    try {
      const body = req.body
      console.log("req in the controller", body)
      const user = await ProcuctService.updateProduct(req, body , res)
      responses(res, user)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const body = req.body
      console.log("req in the controller", body)
      const user = await ProcuctService.deleteProduct(req, body , res)
      responses(res, user)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },

  addTocard: async (req, res) => {
    try {
      const body = req.body
      console.log("req in the controller", body)
      const user = await ProcuctService.addToCard(req, body , res)
      responses(res, user)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
}