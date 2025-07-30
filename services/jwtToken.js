'use strict'
const jwt = require('jsonwebtoken')
module.exports = {
    token: (user) => {
        return new Promise((resolve, reject) => {
            const accessToken = jwt.sign(
                {
                    _id: user[0]?._id,
                    firstName: user[0]?.firstName
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: process.env.jwtExpireTime
                }
            )
            /* eslint-disable */
            if (accessToken) resolve(accessToken)
            else reject({ status: false, message: 'Error creating the Tokens' })
        })
    },
    authToken: (user) => {
        return new Promise((resolve, reject) => {
            const accessToken = jwt.sign(
                {
                    _id: user?._id,
                    firstName: user?.firstName
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: process.env.jwtExpireTime
                }
            )
            /* eslint-disable */
            if (accessToken) resolve(accessToken)
            else reject({ status: false, message: 'Error creating the Tokens' })
        })
    },
    verificationToken: (_id) => {
        return new Promise((resolve, reject) => {
            const token = jwt.sign(
                {
                    _id,
                    deviceType: 'mobile'
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '1d'
                }
            )

            if (token) resolve(token)
            else reject({ status: false, message: 'Error creating the Tokens' })
        })
    },
    verfiyToken: (jwtToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(jwtToken, process.env.TOKEN_KEY, (err, decoded) => {
                if (err) reject({ status: false, message: 'Token  Expired or Invalid Token Send' })
                else {
                    resolve(decoded)
                }
            })
        })
    }
}