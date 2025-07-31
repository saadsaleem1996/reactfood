const jwt = require('jsonwebtoken');
const { responses } = require('../utils/response');
const httpCode = require('../utils/httpCodes');
const ErrorSerializer = require('../serializer/error.serializer');
const RedisService = require('../services/redisService')

module.exports = (req, res, next) => {
    const authorizationHeaders =
      req.headers.authorization || req.headers.Authorization
    const jwtToken = authorizationHeaders
      ? `${authorizationHeaders}`.split('Bearer ')[1]
      : ''

    if (!jwtToken) {
      responses(res, {
        httpCode: httpCode.UNAUTHORIZED,
        ...ErrorSerializer.error(
          httpCode.UNAUTHORIZED,
          req.originalUrl,
          "No Access Token"
        )
      })
    } else {
      jwt.verify(jwtToken, process.env.TOKEN_KEY, async (err, decoded) => {
        if (err) {
          responses(res, {
            httpCode: httpCode.UNAUTHORIZED,
            ...ErrorSerializer.error(
              httpCode.UNAUTHORIZED,
              req.originalUrl,
              "Invalid Access Token"
            )
          })
          res.end()
        } else {
          const user = await RedisService.show(
            `${decoded?._id.toString()}`
          )
          if (!user) {
            responses(res, {
              httpCode: httpCode.UNAUTHORIZED,
              ...ErrorSerializer.error(
                httpCode.UNAUTHORIZED,
                req.originalUrl,
                "Invalid Access Token"
              )
            })
            res.end()
          } else {
            req.token = decoded
            next()
          }
        }
      })
    }
}  