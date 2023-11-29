const mongoose = require("mongoose");
const userModel = require("../model/userModel");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  books: {
    type: [
      {
        book: {
          type: mongoose.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        _id: false,
      },
    ],
  },
  total: {
    type: Number,
    required: true,
  },
});
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
