'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserRolesSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: false
        },
         roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Roles',
            required: false
        },
    },
    { timestamps: true, toJSON: { getters: true, virtuals: true } },
    { versionKey: false }
)

module.exports = mongoose.models.UserRoles || mongoose.model('UserRoles', UserRolesSchema)