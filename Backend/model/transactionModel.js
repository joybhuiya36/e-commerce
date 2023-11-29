const mongoose = require("mongoose");

const transSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Types.ObjectId,
    ref: "Card",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
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

const Transaction = mongoose.model("Transaction", transSchema);

module.exports = Transaction;
