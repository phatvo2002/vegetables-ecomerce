const mongoose = require("mongoose");
const OrderDetailSchema = new mongoose.Schema(
  {
    NameUser: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    ListProductName: {
      type: Array,
      required: false,
    },
    Total: {
      type: Number,
      required: true,
    },
    Country: {
      type: String,
      required: true,
    },
    PaymentMethod: {
      type: String,
      required: false,
    },
    PostalCode: {
      type: String,
      required: true,
    },
    CreditCardNumber: {
      type: String,
      required: false,
    },
    AccountNumber: {
      type: String,
      required: false,
    },
    CardHolder: {
      type: String,
      required: false,
    },
    Address: {
      type: String,
      required: false,
    },
    PhoneNumber: {
      type: String,
      required: false,
    },
    TokenUser: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      default: "Pending",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderDetail", OrderDetailSchema);
