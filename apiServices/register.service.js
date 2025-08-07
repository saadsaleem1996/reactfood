"use strict";
const UserModel = require("../models/user");
const httpCode = require("../utils/httpCodes");
const ErrorSerializer = require("../serializer/error.serializer");
const RegistrationSerializer = require("../serializer/registration.serializer");
const BcryptHelper = require("../utils/bcrypt.helper");
const JwtService = require("../services/jwtToken");
const RedisService = require("../services/redisService");
const RoleMode = require("../models/roles");
const UserRoleModel = require("../models/user-roles");

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
            "Email already Registered"
          ),
        };
      }
      data.password = await BcryptHelper.generate(data?.password);
      const userRole = await RoleMode.findById(data.userRole).select(
        "role_name"
      );
      console.log("user role is ----> ", userRole);
      const user = await UserModel.create({
        firstName: data?.firstName,
        lastName: data?.lastName,
        userRole: userRole._id,
        email: data?.email,
        password: data?.password,
      });
      const authToken = await JwtService.authToken(user);
      await RedisService.create(user?._id.toString(), authToken);
        const createRole = await UserRoleModel.create({
            userId: user._id,
            roleId: userRole._id
      });
      console.log("user role system --- ", createRole)
      return {
        httpCode: httpCode.CREATED,
        data: {
          authToken,
          ...RegistrationSerializer.serialize({
            ...data,
            userRole:userRole.role_name
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