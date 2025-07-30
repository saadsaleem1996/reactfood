'use strict'
const ProfileService = require('../apiServices/profile.service')
const httpCode = require('../utils/httpCodes')
const { responses } = require('../utils/response')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const body = req.body
            console.log("body of get data --- ", req.body)
            const user = await ProfileService.getProfile(req, body, res)

            responses(res, user)
        } catch (error) {
            responses(res, {
                httpCode: httpCode.INTERNAL_SERVER_ERROR,
                errors: [{ message: error.message }]
            })
        }
    },
    updateProfile: async (req, res) => {
        try {
            const body = req.body
            const user = await ProfileService.updateProfile(req, body, res)

            responses(res, user)
        } catch (error) {
            responses(res, {
                httpCode: httpCode.INTERNAL_SERVER_ERROR,
                errors: [{ message: error.message }]
            })
        }
    },
    deleteProfile: async (req, res) => {
        try {
            const body = req.body
            const user = await ProfileService.deleteProfile(req, body, res)

            responses(res, user)
        } catch (error) {
            responses(res, {
                httpCode: httpCode.INTERNAL_SERVER_ERROR,
                errors: [{ message: error.message }]
            })
        }
    },
    changePassword: async (req, res) => {
        try {
            const body = req.body
            const user = await ProfileService.updatePassword(req, body, res)

            responses(res, user)
        } catch (error) {
            responses(res, {
                httpCode: httpCode.INTERNAL_SERVER_ERROR,
                errors: [{ message: error.message }]
            })
        }
    },
}