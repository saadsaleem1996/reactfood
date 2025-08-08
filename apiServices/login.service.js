"use strict";
const UserModel = require("../models/user");
const httpCode = require("../utils/httpCodes");
const ErrorSerializer = require("../serializer/error.serializer");
const LoginSerializer = require("../serializer/login.serializer");
const BcryptHelper = require("../utils/bcrypt.helper")
const JwtService = require("../services/jwtToken")
const RedisService = require("../services/redisService");
const UserRoleModel = require("../models/user-roles")
const RoleModel = require("../models/roles")

module.exports = {
    login: async (req, data, res) => {
        try {
            data.email = data?.email.toLowerCase();
            const checkEmail = await UserModel.findOne({ email: data?.email });
            if (!checkEmail) {
                return {
                    httpCode: httpCode.BAD_REQUEST,
                    ...ErrorSerializer.error(
                        httpCode.BAD_REQUEST,
                        req.originalUrl,
                        "Email not found"
                    ),
                };
            }

            const user = await UserModel.find({
                email: data?.email,
            });


            const userRole = await UserRoleModel.findOne({
                userId: user[0]._id,
                roleId: user[0].userRole
            });
            
            const findRole = await RoleModel.findById({
                _id: userRole.roleId
            }).select("role_name")
            
            const response = await BcryptHelper.compare(data.password, user[0].password)

            if (!response) {
                return {
                    httpCode: httpCode.INTERNAL_SERVER_ERROR,
                    errors: [{ message: 'Incorrect Password' }],
                };
            }
            const authToken = await JwtService.authToken(user[0]);
            await RedisService.create(user[0]?._id.toString(), authToken);

            return {
                httpCode: httpCode.OK,
                data: {
                    ...LoginSerializer.serialize({
                        _id: user[0]._id,
                        firstName: user[0].firstName,
                        lastName: user[0].lastName,
                        email: user[0].email,
                        userRole: findRole.role_name,
                        authToken: authToken
                    }),
                },
            };
        } catch (error) {
            return {
                httpCode: httpCode.INTERNAL_SERVER_ERROR,
                errors: [{ message: error.message }],
            };
        }
    },
};