"use strict";
const UserModel = require("../models/user");
const httpCode = require("../utils/httpCodes");
const RedisService = require("../services/redisService");

module.exports = {
    logout: async (req, res) => {
        try {
            const userId = req?.token?._id
            console.log('userId',userId)
            const user = await UserModel.findOne({
             _id:userId,
            });
            console.log('userId',user)
            await RedisService.delete(user?._id.toString())
            return {
                httpCode: httpCode.OK,
                data: {
                  message: 'Successfuly Logged out',
                },
              };
        } catch (error) {
            return {
                httpCode: httpCode.INTERNAL_SERVER_ERROR,
                errors: [{ message: error.message }],
            };
        }
    }
};