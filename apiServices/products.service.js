"use strict";
const ProductModel = require("../models/product");
const CartModel = require("../models/cart");
const httpCode = require("../utils/httpCodes");
const ProductSerializer = require("../serializer/product.serializer");
const CartSerializer = require("../serializer/cart.serializer");
const cart = require("../models/cart");
const ErrorSerializer = require("../serializer/error.serializer");

module.exports = {
  createProduct: async (req, data, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      } 

      const product = await ProductModel.create({
        name: data.name,
        price: data.price,
        description: data.description,
        categoryId: data.categoryId,
        imageUrl: req.file.path
      });


      return {
        httpCode: httpCode.OK,
        data: {
          ...ProductSerializer.serialize(product),
          message: "Product added successfully",
          
        },
      };
    } catch (error) {
      return {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }],
      };
    }
  },
  updateProduct: async (req, data, res) => {
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(
        {
          _id: data.id,
        },
        { $set: data }
      );

      return {
        httpCode: httpCode.OK,
        data: {
          ...ProductSerializer.serialize(updateProduct),
          message: "Product updated successfully",
        },
      };
    } catch (error) {
      return {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }],
      };
    }
  },
  deleteProduct: async (req, data, res) => {
    try {
      const deleteProduct = await ProductModel.findByIdAndDelete({
        _id: data.id,
      });

      return {
        httpCode: httpCode.OK,
        data: {
          message: "Product deleted successfully",
          
        },
      };
    } catch (error) {
      return {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }],
      };
    }
  },
  getAllProduct: async (req, data, res) => {
    try {
      const allProduct = await ProductModel.find({});


      return {
        httpCode: httpCode.OK,
        data: {
          ...ProductSerializer.serialize(allProduct),
        },
      };
    } catch (error) {
      return {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }],
      };
    }
  },

  addToCart: async (req, data, res) => {
    try {
      const userId = req?.token?._id;
      console.log("user id is ---- ", userId);

      let cart = await CartModel.findOne({ userId: userId });

      if (!cart) {
        cart = await CartModel.create({
          userId: userId,
          products: [{ productId: data.productId, quantity: data.quantity }],
        });
      } else {
        const productIndex = cart.products.findIndex(
          (p) => p.productId.toString() === data.productId
        );

        if (productIndex > -1) {
          cart.products[productIndex].quantity += data.quantity;
        } else {
          cart.products.push({
            productId: data.productId,
            quantity: data.quantity,
          });
        }

        await cart.save();
      }

      return {
        httpCode: httpCode.OK,
        data: {
          ...CartSerializer.serialize(cart),
          message: "Product added to cart successfully",
        },
      };
    } catch (error) {
      console.error("Error adding to cart:", error);
      return {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }],
      };
    }
  },
};
