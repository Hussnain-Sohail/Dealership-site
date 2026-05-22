const mongoose = require("mongoose");
const Order = require("./OrderSchema.cjs");
const { type } = require("node:os");

const UserSchema = new mongoose.Schema({
  Name: String,
  Age: Number,
  Password: String,
  AccountCreatedAt: String,
  Role: { type: String, default: "user" },
  Orders: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    default: [],
  },
  City: { type: String, default: "" },
  ContactNumber: { type: String, default: "" },
});

module.exports = mongoose.model("User", UserSchema);
