"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: false,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    passwordChangedRequest: {
      type: Boolean,
      default: false,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
    userRole: {
      type: String,
      required: false,
    },
    socialAccounts: [
      {
        platForm: { type: String, required: false },
        socialId: { type: String, required: false },
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    notificationEnabale: {
      type: Boolean,
      default: true,
      required: true,
    },
    emailEnabale: {
      type: Boolean,
      default: true,
      required: true,
    },
    authToken: {
      type: String,
      default: "",
    },
    authCode: {
      type: String,
      default: "",
    },
    codeCreatedAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true, toJSON: { getters: true, virtuals: true } },
  { versionKey: false }
);

userSchema.index({ fullName: 1, email: 1, type: -1 });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
