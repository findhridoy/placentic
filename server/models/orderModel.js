// External Imports
const { Schema, model } = require("mongoose");

// User Schema
const OrderSchema = new Schema(
  {
    orderID: {
      type: String,
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customer: {
      name: { type: String, required: true },
      image: { type: String, required: true },
    },
    orderItems: [
      {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
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
      default: 0.0,
    },
    shippingAddress: {
      phone_number: { type: Number },
      address: { type: String },
      city: { type: String },
      zip_code: { type: Number },
      country: { type: String },
    },
    deliveryStatus: {
      type: String,
      required: true,
      enum: ["prepared", "deliverd", "completed", "canceled", "free"],
      default: "prepared",
    },
    deliveredAt: {
      type: Date,
    },
    paymentResult: {
      status: { type: String },
      payment_id: { type: String },
      email_address: { type: String },
      paid_at: { type: Date },
      payment_method: { type: String },
    },
  },
  { timestamps: true }
);

// Export order model
const Order = model("Order", OrderSchema);
module.exports = Order;
