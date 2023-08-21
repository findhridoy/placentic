// External Imports
const { Schema, model } = require("mongoose");

// User Schema
const OrderSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: Object, required: true },
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingAddress: {
      name: { type: String, required: true },
      phone_number: { type: Number, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      zip_code: { type: Number, required: true },
      country: { type: String, required: true },
    },
    isDelevered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleveredAt: {
      type: Date,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      payment_id: { type: String },
      email_address: { type: String },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Export order model
const Order = model("Order", OrderSchema);
module.exports = Order;
