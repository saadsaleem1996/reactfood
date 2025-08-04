'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: false
        },
    },
    { timestamps: true, toJSON: { getters: true, virtuals: true } },
    { versionKey: false }
)

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema)