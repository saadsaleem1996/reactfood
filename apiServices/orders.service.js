"use strict";
const OrderModel = require("../models/order");
const CartModel = require("../models/cart");
const httpCode = require("../utils/httpCodes");
const OrderSerializer = require("../serializer/order.serializer");

module.exports = {
  createOrder: async (req, data, res) => {
    try {
      const userId = data.userId;

      const cart = await CartModel.findOne({ userId }).populate(
        "products.productId"
      );

      if (!cart || cart.products.length === 0) {
        return {
          httpCode: httpCode.BAD_REQUEST,
          errors: [{ message: "Cart is empty" }],
        };
      }

      let totalAmount = 0;
      const productDetails = cart.products.map((item) => {
        const product = item.productId;
        const quantity = item.quantity;
        const price = product.price || 0;
        const subtotal = price * quantity;

        totalAmount += subtotal;

        return {
          name: product.name,
          price,
          quantity,
          subtotal,
          productId: product._id,
          image: product.image,
        };
      });

      return {
        httpCode: httpCode.OK,
        data: {
          products: productDetails,
          totalAmount,
          message: "Order preview fetched successfully",
        },
      };
    } catch (error) {
      console.error("Error in order preview:", error);
      return {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }],
      };
    }
  },
  updateOrder: async (req, data, res) => {
    try {
      const updateOrder = await OrderModel.findByIdAndUpdate(
        {
          _id: data.id,
        },
        {
          $addToSet: { products: data.products },
        },
        { new: true }
      ).populate("products", "name , price");


      return {
        httpCode: httpCode.OK,
        data: {
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

  placeOrder: async (req, data, res) => {
  try {
    const userId = data.userId;

    const cartItems = await CartModel.find({ userId });

    if (!cartItems || cartItems.length === 0) {
      return {
        httpCode: httpCode.BAD_REQUEST,
        errors: [{ message: "Cart is empty. Please add products before placing an order." }],
      };
    }
    await CartModel.deleteMany({ userId });

    return {
      httpCode: httpCode.OK,
      data: {
        message: "Order has been successfully placed.",
      },
    };
  } catch (error) {
    console.error("Error in placing order:", error);
    return {
      httpCode: httpCode.INTERNAL_SERVER_ERROR,
      errors: [{ message: error.message }],
    };
  }
}
};
