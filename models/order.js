"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: true
          },
          quantity: {
            type: Number,
            default: 1
          }
        }
      ],
    total_price: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, toJSON: { getters: true, virtuals: true } },
  { versionKey: false }
);

module.exports =
  mongoose.models.Orders || mongoose.model("Orders", OrderSchema);
