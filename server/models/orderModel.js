// External Imports
const { Schema, model } = require("mongoose");

// User Schema
const OrderSchema = new Schema(
  {
    orderID: {
      type: String,
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
      default: 0,
    },
    shippingAddress: {
      phone_number: { type: Number, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      zip_code: { type: Number, required: true },
      country: { type: String, required: true },
    },
    deliveryStatus: {
      type: String,
      required: true,
      enum: ["prepared", "deliverd", "completed", "canceled"],
      default: "prepared",
    },
    deliveredAt: {
      type: Date,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      status: { type: String },
      payment_id: { type: String },
      email_address: { type: String },
      paidAt: { type: Date },
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["authorized", "paid"],
    },
  },
  { timestamps: true }
);

// Export order model
const Order = model("Order", OrderSchema);
module.exports = Order;
