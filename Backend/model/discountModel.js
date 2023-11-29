const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Book",
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  activeTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endTime: {
    type: Date,
    required: true,
  },
});
const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;
