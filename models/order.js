'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema(
    {
        cart: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart',
            required: false
        }],
        total_price: {
            type: String,
            required: false
        }, 
    },
    { timestamps: true, toJSON: { getters: true, virtuals: true } },
    { versionKey: false }
)

module.exports = mongoose.models.Orders || mongoose.model('Orders', OrderSchema)