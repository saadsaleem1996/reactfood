"use strict";
const UserModel = require("../models/user");
const httpCode = require("../utils/httpCodes");
const ErrorSerializer = require("../serializer/error.serializer");
const RegistrationSerializer = require("../serializer/registration.serializer");
const BcryptHelper = require("../utils/bcrypt.helper")
const JwtService = require("../services/jwtToken")
const RedisService = require("../services/redisService");

module.exports = {
    register: async (req, data) => {
        try {
            data.email = data?.email.toLowerCase();
            const duplicatEmail = await UserModel.findOne({ email: data?.email });
            if (duplicatEmail) {
                return {
                    httpCode: httpCode.BAD_REQUEST,
                    ...ErrorSerializer.error(
                        httpCode.BAD_REQUEST,
                        req.originalUrl,
                        req.t("Email is already Registered")
                    ),
                };
            }
            data.password = await BcryptHelper.generate(data?.password)
            const user = await UserModel.create({
              firstName :  data?.firstName,
              lastName :  data?.lastName,
              email: data?.email,
              password: data?.password
            });

            const authToken = await JwtService.authToken(user);
            await RedisService.create(user?._id.toString(), authToken);


            return {
                httpCode: httpCode.CREATED,
                data: {
                     authToken,
                    ...RegistrationSerializer.serialize({
                        ...data
                    }),
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