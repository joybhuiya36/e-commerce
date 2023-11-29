const express = require("express");
const route = express();
const reviewRatingController = require("../controller/reviewRatingController");
const { isValid } = require("../middleware/validator");

route.post(
  "/add",
  isValid.reviewRatingAdd,
  reviewRatingController.addReviewRating
);
route.get("/all", reviewRatingController.getAllReviewRating);
route.patch("/edit", isValid.editReview, reviewRatingController.editReview);
route.post(
  "/remove",
  isValid.removeReviewRating,
  reviewRatingController.removeReviewRating
);

module.exports = route;
