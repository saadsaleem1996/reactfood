"use strict";
const RolesModel = require("../models/roles");
const httpCode = require("../utils/httpCodes");
const ErrorSerializer = require("../serializer/error.serializer");
const RoleSerializer = require("../serializer/role.serializer");
const userModel = require("../models/user");

module.exports = {
  createRoles: async (req, data, res) => {
    try {
      const id = req?.token?._id;
      const findRole = await userModel
        .findById({
          _id: id,
        })
        .populate("userRole");
      if (findRole.userRole["role_name"] !== "Super Admin") {
        return {
          httpCode: httpCode.INTERNAL_SERVER_ERROR,
          errors: [{ message: "Not Authorize for creating role" }],
        };
      }
      const roleExists = await RolesModel.findOne({ role_name: data.name });
      if (roleExists) {
        return {
          httpCode: httpCode.INTERNAL_SERVER_ERROR,
          errors: [{ message: "Role Already exist" }],
        };
      }

      const role = await RolesModel.create({
        role_name: data.name,
      });

      return {
        httpCode: httpCode.OK,
        data: {
          ...RoleSerializer.serialize(role),
          message: "Role Created successfully",
        },
      };
    } catch (error) {
      return {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }],
      };
    }
  },
  updateRole: async (req, data, res) => {
    try {
      const id = req?.token?._id;
      const findRole = await userModel
        .findById({
          _id: id,
        })
        .populate("userRole");
      if (findRole.userRole["role_name"] !== "Super Admin") {
        return {
          httpCode: httpCode.INTERNAL_SERVER_ERROR,
          errors: [{ message: "Not Authorize for updating role" }],
        };
      }

      await RolesModel.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: data }
      );

      return {
        httpCode: httpCode.OK,
        data: {
          message: "Role updated successfully",
        },
      };
    } catch (error) {
      return {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }],
      };
    }
  },
  deleteRole: async (req, data, res) => {
    try {
      const id = req?.token?._id;
      const findRole = await userModel
        .findById({
          _id: id,
        })
        .populate("userRole");
      if (findRole.userRole["role_name"] !== "Super Admin") {
        return {
          httpCode: httpCode.INTERNAL_SERVER_ERROR,
          errors: [{ message: "Not Authorize for delete role" }],
        };
      }
      await RolesModel.findByIdAndDelete({
        _id: req.params.id,
      });

      return {
        httpCode: httpCode.OK,
        data: {
          message: "Role deleted successfully",
        },
      };
    } catch (error) {
      return {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }],
      };
    }
  },
  getAllRoles: async (req, data, res) => {
    try {
      const id = req?.token?._id;
      const findRole = await userModel
        .findById({
          _id: id,
        })
        .populate("userRole");
      if (findRole.userRole["role_name"] !== "Super Admin") {
        return {
          httpCode: httpCode.INTERNAL_SERVER_ERROR,
          errors: [{ message: "Not Authorize for creating role" }],
        };
      }

      const allRoles = await RolesModel.find({
        role_name: { $ne: "Super Admin" },
      });

      return {
        httpCode: httpCode.OK,
        data: {
          ...RoleSerializer.serialize(allRoles),
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
