"use strict";
const OrderModel = require("../models/order");
const CartModel = require("../models/cart");
const httpCode = require("../utils/httpCodes");
const OrderSerializer = require("../serializer/order.serializer")

module.exports = {
    createOrder: async (req, data, res) => {
        try {
            const findCart = await CartModel.find({
            })
            console.log("data in cart ----> ", findCart)
            const order = await OrderModel.create({
                    cart: findCart,
                    total_price: data.totalPrice
                })
            console.log("order is ---->", order)

            

            return {
                    httpCode: httpCode.OK,
                    data: {
                        // findProduct,
                         ...OrderSerializer.serialize(order ),
                         message: "Order added successfully"
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
    updateOrder: async (req, data, res) => {
         try {
                    console.log("data in the service", data)
                    const updateOrder = await OrderModel.findByIdAndUpdate({
                        _id: data.id,
                    },
                    {
                        $addToSet: { products: data.products }
                    },
                    { new: true }
                    ).populate('products', 'name , price')
        
                    console.log("Order is ---->", updateOrder)
        
                    return {
                            httpCode: httpCode.OK,
                            data: {
                                //  ...OrderSerializer.serialize(updateOrder),
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
    }
};