"use strict";
const CategoryModel = require("../models/category");
const httpCode = require("../utils/httpCodes");
const ErrorSerializer = require("../serializer/error.serializer");
const UserModel = require("../models/user");

module.exports = {
  createCategory: async (req, data, res) => {
    try {
      const id = req?.token?._id;
      const findRole = await UserModel.findById({
        _id: id,
      }).populate("userRole");
      if (findRole.userRole["role_name"] !== "Super Admin") {
        return {
          httpCode: httpCode.INTERNAL_SERVER_ERROR,
          errors: [{ message: "Not Authorize for creating role" }],
        };
      }
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const categoryExists = await CategoryModel.findOne({ name: data.name });
      if (categoryExists) {
        return {
          httpCode: httpCode.INTERNAL_SERVER_ERROR,
          errors: [{ message: "Category Already exist" }],
        };
      }
      const category = await CategoryModel.create({
        name: data.name,
        imageUrl: req.file.path,
      });

      return {
        httpCode: httpCode.OK,
        data: {
          category,
          message: "Category added successfully",
        },
      };
    } catch (error) {
      return {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }],
      };
    }
  },
  updateCategory: async (req, data, res) => {
    try {
      const id = req?.token?._id;
      const findRole = await UserModel.findById({
        _id: id,
      }).populate("userRole");
      if (findRole.userRole["role_name"] !== "Super Admin") {
        return {
          httpCode: httpCode.INTERNAL_SERVER_ERROR,
          errors: [{ message: "Not Authorize for creating role" }],
        };
      }
      if (req.file) {
        data.imageUrl = `uploads/${req.file.filename}`;
      } else {
        // Remove image key if no new image uploaded
        delete data.imageUrl;
      }
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: data },
        { new: true }
      );

      return {
        httpCode: httpCode.OK,
        data: {
          updatedCategory,
          message: "Category updated successfully",
        },
      };
    } catch (error) {
      return {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }],
      };
    }
  },
  deleteCategory: async (req, data, res) => {
    try {
      const id = req?.token?._id;
      const findRole = await UserModel.findById({
        _id: id,
      }).populate("userRole");
      if (findRole.userRole["role_name"] !== "Super Admin") {
        return {
          httpCode: httpCode.INTERNAL_SERVER_ERROR,
          errors: [{ message: "Not Authorize for creating role" }],
        };
      }
      await CategoryModel.findByIdAndDelete({
        _id: req.params.id,
      });

      return {
        httpCode: httpCode.OK,
        data: {
          message: "Category deleted successfully",
        },
      };
    } catch (error) {
      return {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }],
      };
    }
  },
  getAllCategories: async (req, data, res) => {
    try {
      const allCategories = await CategoryModel.find({});

      return {
        httpCode: httpCode.OK,
        data: {
          allCategories,
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
