"use strict";
const RolesModel = require("../models/roles");
const httpCode = require("../utils/httpCodes");
const ErrorSerializer = require("../serializer/error.serializer");

module.exports = {
  createRoles: async (req, data, res) => {
    try {
      const role = await RolesModel.create({
        name: data.name,
      });

      return {
        httpCode: httpCode.OK,
        data: {
          role,
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
      const role = await RolesModel.findByIdAndUpdate(
        {
          _id: data.id,
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
      const role = await RolesModel.findByIdAndDelete({
        _id: data.id,
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
      const allRoles = await CategoryModel.find({});

      return {
        httpCode: httpCode.OK,
        data: {
          allRoles,
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
