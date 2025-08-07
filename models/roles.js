'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RolesSchema = new Schema(
    {
        role_name: {
            type: String,
            required: false
        }, 
    },
    { timestamps: true, toJSON: { getters: true, virtuals: true } },
    { versionKey: false }
)

module.exports = mongoose.models.Roles || mongoose.model('Roles', RolesSchema)