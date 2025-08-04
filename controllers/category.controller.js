'use strict'
const CategoryService = require('../apiServices/category.service')
const httpCode = require('../utils/httpCodes')
const { responses } = require('../utils/response')

module.exports = {
  createCategory: async (req, res) => {
    try {
      const body = req.body
      console.log("req in the controllwe", body)
      const category = await CategoryService.createCategory(req, body , res)
      responses(res, category)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
  updateCategory: async (req, res) => {
    try {
      const body = req.body
      console.log("req in the controller", body)
      const category = await CategoryService.updateCategory(req, body , res)
      responses(res, category)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const body = req.body
      console.log("req in the controller", body)
      const category = await CategoryService.deleteCategory(req, body , res)
      responses(res, category)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
  getAllCategories: async (req, res) => {
    try {
      const body = req.body
      console.log("req in the controller", body)
      const category = await CategoryService.getAllCategories(req, body , res)
      responses(res, category)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },

}