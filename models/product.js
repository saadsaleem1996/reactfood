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
        imageUrl: {
            type: String,
            required: false
        },
       categoryId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'categories',
           required: true
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