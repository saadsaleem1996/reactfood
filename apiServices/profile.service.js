"use strict";
const UserModel = require("../models/user");
const httpCode = require("../utils/httpCodes");
const RedisService = require("../services/redisService");
const LoginSerializer = require("../serializer/login.serializer");
const BcryptHelper = require("../utils/bcrypt.helper")
const ErrorSerializer = require("../serializer/error.serializer");
const mongoose = require("mongoose");


module.exports = {
    getProfile: async (req, data, res) => {
        try {
            const userId = req?.token?._id
            console.log('Token -- ', userId)
            const user = await UserModel.findOne({
                _id: userId,
            });
            console.log('user data ', user)
            // await RedisService.delete(user?._id.toString())
            return {
                httpCode: httpCode.OK,
                data: {
                    ...LoginSerializer.serialize(user),
                },
            };
        } catch (error) {
            return {
                httpCode: httpCode.INTERNAL_SERVER_ERROR,
                errors: [{ message: error.message }],
            };
        }
    },
    updateProfile: async (req, data, res) => {
        try {
            const userId = req?.token?._id
            console.log('Token -- ', userId)
            const updatedUser = await UserModel.findByIdAndUpdate({
                _id: userId,
            },
                { $set: data }
            );
            console.log('user data for update', updatedUser)
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            // res.json(updatedUser);
            return {
                httpCode: httpCode.OK,
                data: {
                    ...LoginSerializer.serialize(updatedUser),
                    message: "User Updated Successfully"
                },
            };
        } catch (error) {
            return {
                httpCode: httpCode.INTERNAL_SERVER_ERROR,
                errors: [{ message: error.message }],
            };
        }
    },
    deleteProfile: async (req, data, res) => {
        try {
            const userId = req?.token?._id
            console.log('Token -- ', userId)
            if (!data.userId) {
                return {
                    httpCode: httpCode.BAD_REQUEST,
                    ...ErrorSerializer.error(
                        httpCode.BAD_REQUEST,
                        req.originalUrl,
                        req.t("Please enter user id")
                    ),
                };
            }
            const deletedUser = await UserModel.findByIdAndDelete({
                _id: userId,
            },
            );
            console.log('delete user data', deletedUser)
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return {
                httpCode: httpCode.OK,
                data: {
                    ...LoginSerializer.serialize(deletedUser),
                    message: "User has been deleted!"
                },
            };
        } catch (error) {
            return {
                httpCode: httpCode.INTERNAL_SERVER_ERROR,
                errors: [{ message: error.message }],
            };
        }
    },
    updatePassword: async (req, data, res) => {
        try {
            const userId = req?.token?._id
            console.log('Token -- ', userId)
            const user = await UserModel.findOne({
                _id: userId,
            });
            console.log("response of password change is ----> ", data.password, user)
            const response = await BcryptHelper.compare(data.password, user.password)
            
            
            const newPassword = data.newPassword

            if (!response) {
                console.log('incorrect password')
                return {
                    httpCode: httpCode.INTERNAL_SERVER_ERROR,
                    errors: [{ message: 'Incorrect Password' }],
                };
            }
            data.newPassword = await BcryptHelper.generate(data?.newPassword)
            await UserModel.findOneAndUpdate({
                _id: userId,
                password: data.newPassword
            });
            return {
                httpCode: httpCode.OK,
                data: {
                    message: "Password Changed Successfully"
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