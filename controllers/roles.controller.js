'use strict'
const RoleService = require('../apiServices/roles.service')
const httpCode = require('../utils/httpCodes')
const { responses } = require('../utils/response')

module.exports = {
  createRole: async (req, res) => {
    try {
      const body = req.body
      const role = await RoleService.createRoles(req, body , res)
      responses(res, role)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
  updateRole: async (req, res) => {
    try {
      const body = req.body
      const role = await RoleService.updateRole(req, body , res)
      responses(res, role)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
  deleteRole: async (req, res) => {
    try {
      const body = req.body
      const role = await RoleService.deleteRole(req, body , res)
      responses(res, role)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
  getAllRoles: async (req, res) => {
    try {
      const body = req.body
      const role = await RoleService.getAllRoles(req, body , res)
      responses(res, role)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },

}