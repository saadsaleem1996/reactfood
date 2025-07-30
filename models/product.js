'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const prductSchema = new Schema(
    {
        name: {
            type: String,
            required: false
        }, 
        price: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        }, 
    },
    { timestamps: true, toJSON: { getters: true, virtuals: true } },
    { versionKey: false }
)

module.exports = mongoose.models.Products || mongoose.model('Products', prductSchema)