"use strict";
const ProductModel = require("../models/product");
const CartModel = require("../models/cart");
const httpCode = require("../utils/httpCodes");
const ProductSerializer = require("../serializer/product.serializer")

module.exports = {
    createProduct: async (req, data, res) => {
        try {
            console.log("data in the service", data)
            const product = await ProductModel.create({
                    name: data.name,
                    price: data.price,
                    description: data.description
                })

                console.log("product is ---->", product)

            return {
                    httpCode: httpCode.OK,
                    data: {
                         ...ProductSerializer.serialize(product),
                         message: "Product added successfully"
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
            console.log("data in the service", data)
            const updateProduct = await ProductModel.findByIdAndUpdate({
                _id: data.id,
            },
            { $set: data }
               
            )

            console.log("product is ---->", updateProduct)

            return {
                    httpCode: httpCode.OK,
                    data: {
                         ...ProductSerializer.serialize(updateProduct),
                         message: "Product updated successfully"
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
            console.log("data in the service", data)
            const deleteProduct = await ProductModel.findByIdAndDelete({
                _id: data.id,
            }, 
            )

            console.log("product is ---->", deleteProduct)

            return {
                    httpCode: httpCode.OK,
                    data: {
                         message: "Product deleted successfully"
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

    addToCard: async (req, data, res) => {
        try {
            console.log("data in the service", data)
            const cart = await CartModel.create({
                productId: data.productId,
                quantity: data.quantity
                })

                console.log("add to cart ", cart)

            return {
                    httpCode: httpCode.OK,
                    data: {
                        //  ...ProductSerializer.serialize(product),
                         message: "Product added successfully"
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
};