"use strict";
const CategoryModel = require("../models/category");
const httpCode = require("../utils/httpCodes");
const ErrorSerializer = require("../serializer/error.serializer");

module.exports = {
  createCategory: async (req, data, res) => {
    try { 

      const category = await CategoryModel.create({
        name: data.name,
      });

      console.log("product is ---->", category);

      return {
        httpCode: httpCode.OK,
        data: {
            category,
          message: "Category added successfully",
          // product,
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
      console.log("data in the service", data);
      const category = await CategoryModel.findByIdAndUpdate(
        {
          _id: data.id,
        },
        { $set: data }
      );

      console.log("product is ---->", category);

      return {
        httpCode: httpCode.OK,
        data: {
        //   ...ProductSerializer.serialize(updateProduct),
          message: "Category updated successfully",
          // product,
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
      console.log("data in the service", data);
      const category = await CategoryModel.findByIdAndDelete({
        _id: data.id,
      });

      console.log("product is ---->", category);

      return {
        httpCode: httpCode.OK,
        data: {
          message: "Category deleted successfully",
          // product,
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

      console.log("product is ---->", allCategories);

      return {
        httpCode: httpCode.OK,
        data: {
          allCategories
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
