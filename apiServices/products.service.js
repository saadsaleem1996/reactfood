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
      const product = await ProductModel.create({
        name: data.name,
        price: data.price,
        description: data.description,
      });

      console.log("product is ---->", product);

      return {
        httpCode: httpCode.OK,
        data: {
          ...ProductSerializer.serialize(product),
          message: "Product added successfully",
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
  updateProduct: async (req, data, res) => {
    try {
      console.log("data in the service", data);
      const updateProduct = await ProductModel.findByIdAndUpdate(
        {
          _id: data.id,
        },
        { $set: data }
      );

      console.log("product is ---->", updateProduct);

      return {
        httpCode: httpCode.OK,
        data: {
          ...ProductSerializer.serialize(updateProduct),
          message: "Product updated successfully",
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
  deleteProduct: async (req, data, res) => {
    try {
      console.log("data in the service", data);
      const deleteProduct = await ProductModel.findByIdAndDelete({
        _id: data.id,
      });

      console.log("product is ---->", deleteProduct);

      return {
        httpCode: httpCode.OK,
        data: {
          message: "Product deleted successfully",
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
   getAllProduct: async (req, data, res) => {
    try {
      const allProduct = await ProductModel.find({
      });

      console.log("product is ---->", allProduct);

      return {
        httpCode: httpCode.OK,
        data: {
          // message: "Product deleted successfully",
          ...ProductSerializer.serialize(allProduct),
          // allProduct,
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
      console.log("data in the service", data);

      // Find if a cart already exists for the user
      let cart = await CartModel.findOne({ userId: data.userId });

      if (!cart) {
        // Create a new cart if none exists
        cart = await CartModel.create({
          userId: data.userId,
          products: [{ productId: data.productId, quantity: data.quantity }],
        });
      } else {
        // Check if product already exists in the cart
        const productIndex = cart.products.findIndex(
          (p) => p.productId.toString() === data.productId
        );

        if (productIndex > -1) {
          // If product exists, update the quantity
          cart.products[productIndex].quantity += data.quantity;
        } else {
          // If not, push the new product
          cart.products.push({
            productId: data.productId,
            quantity: data.quantity,
          });
        }

        await cart.save();
      }

      console.log("cart is ---> ", cart);

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
