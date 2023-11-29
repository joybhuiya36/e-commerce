const mongoose = require("mongoose");

const reviewRatingSchema = new mongoose.Schema({
  book: {
    type: mongoose.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  reviews: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      review: {
        type: String,
        default: "",
      },
      rating: {
        type: Number,
        required: true,
      },
      _id: false,
    },
  ],
  totalRating: {
    type: Number,
    required: true,
  },
});
const ReviewRating = mongoose.model("ReviewRating", reviewRatingSchema);

module.exports = ReviewRating;
