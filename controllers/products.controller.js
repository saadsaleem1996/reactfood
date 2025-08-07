'use strict'
const ProcuctService = require('../apiServices/products.service')
const httpCode = require('../utils/httpCodes')
const { responses } = require('../utils/response')

module.exports = {
  createProducts: async (req, res) => {
    try {
      const body = req.body
      const product = await ProcuctService.createProduct(req, body , res)
      responses(res, product)
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
      const product = await ProcuctService.updateProduct(req, body , res)
      responses(res, product)
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
      const product = await ProcuctService.deleteProduct(req, body , res)
      responses(res, product)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const body = req.body
      const product = await ProcuctService.getAllProduct(req, body , res)
      responses(res, useproductr)
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
      const product = await ProcuctService.addToCart(req, body , res)
      responses(res, product)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
}