'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema(
    {
        productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products',
                    required: false
                },
        quantity: {
                    type: Number,
                    required: false
                }, 
    },
    { timestamps: true, toJSON: { getters: true, virtuals: true } },
    { versionKey: false }
)

module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema)