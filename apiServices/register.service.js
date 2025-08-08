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
const RoleController = require("../controllers/roles.controller");
const rolesController = require("../controllers/roles.controller");

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
      const getUsers = await UserModel.find();
      console.log("users length", getUsers.length);
      let role
      if (getUsers.length == 0) {
        console.log("no user found");
        role = await RoleMode.findOne({ role_name: "Super Admin" });
        if (!role) {
          role = await RoleMode.create({ role_name: "Super Admin" });
        }
      }else{
        console.log("user found");
        role = await RoleMode.findOne({ role_name: "User" });
        if (!role) {
          role = await RoleMode.create({ role_name: "User" });
        }
      }
      console.log("user role name is ---- ", role);
    //   const userRole = await RoleMode.findOne({
    //     role_name: role,
    //   }).select("role_name");
    //   console.log("user role is ---- ", userRole);
      if (!role) {
        return {
          httpCode: httpCode.BAD_REQUEST,
          ...ErrorSerializer.error(
            httpCode.BAD_REQUEST,
            req.originalUrl,
            "Role not found"
          ),
        };
      }
      const user = await UserModel.create({
        firstName: data?.firstName,
        lastName: data?.lastName,
        userRole: role._id,
        email: data?.email,
        password: data?.password,
      });
      const authToken = await JwtService.authToken(user);
      await RedisService.create(user?._id.toString(), authToken);
      const createRole = await UserRoleModel.create({
        userId: user._id,
        roleId: role._id,
      });
      return {
        httpCode: httpCode.CREATED,
        data: {
          authToken,
          ...RegistrationSerializer.serialize({
            ...data,
            _id:user._id,
            userRole: role.role_name,
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
