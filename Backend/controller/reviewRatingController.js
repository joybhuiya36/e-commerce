const reviewRatingModel = require("../model/reviewRatingModel");
const bookModel = require("../model/bookModel");
const userModel = require("../model/userModel");
const jsonwebtoken = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { success, failure } = require("../util/common");

class reviewRating {
  async addReviewRating(req, res) {
    try {
      if (!req.headers.authorization)
        return res.status(401).send(failure("Unauthorized Access!"));
      const token = req.headers.authorization.split(" ")[1];
      const check = jsonwebtoken.verify(token, process.env.SECRET_KEY);
      if (check.role == 1) {
        return res
          .status(422)
          .send(failure("Admin can't perform review rating!"));
      }
      if (!check) throw new Error();

      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return res.status(422).send(
          failure(
            "Failed to Add Review-Rating",
            validation.map((x) => x.msg)
          )
        );
      }
      const user = await userModel.findOne({ email: check.email });
      const { bookId, review, rating } = req.body;
      const book = await bookModel.findOne({ _id: bookId });
      if (!book) {
        return res.status(404).send(failure("Book is not Found!"));
      }
      let bookInReview = await reviewRatingModel.findOne({ book: bookId });

      if (bookInReview) {
        const existingUser = bookInReview.reviews.find((x) =>
          x.user.equals(user._id)
        );
        if (existingUser) {
          return res
            .status(409)
            .send(failure("User Already Gave his/her Review-Rating!"));
        }
        bookInReview.totalRating =
          (bookInReview.totalRating * bookInReview.reviews.length + rating) /
          (bookInReview.reviews.length + 1);
        bookInReview.reviews.push({
          user: user._id,
          review: review,
          rating: rating,
        });
        await bookInReview.save();
        book.rating = bookInReview.totalRating;
        await book.save();
      } else {
        bookInReview = await reviewRatingModel.create({
          book: bookId,
          reviews: [{ user: user._id, review: review, rating: rating }],
          totalRating: rating,
        });
        const book = await bookModel.findOne({ _id: bookId });
        book.rating = rating;
        await book.save();
      }
      return res
        .status(201)
        .send(success("Review-Rating is Newly Created!", bookInReview));
    } catch (error) {
      if (error instanceof jsonwebtoken.TokenExpiredError) {
        return res.status(401).send(failure("Please Login Again!"));
      }
      if (error instanceof jsonwebtoken.JsonWebTokenError) {
        return res.status(401).send(failure("Token Invalid!"));
      }
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }

  async getAllReviewRating(req, res) {
    try {
      const allReviewRatings = await reviewRatingModel
        .find()
        .populate("reviews.user", "_id name email");

      if (!allReviewRatings || allReviewRatings.length === 0) {
        return res.status(404).send(failure("No Review Ratings Found!"));
      }
      return res
        .status(200)
        .send(success("All Review Ratings Retrieved", allReviewRatings));
    } catch (error) {
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }

  async editReview(req, res) {
    try {
      if (!req.headers.authorization)
        return res.status(401).send(failure("Unauthorized Access!"));
      const token = req.headers.authorization.split(" ")[1];
      const check = jsonwebtoken.verify(token, process.env.SECRET_KEY);
      if (!check) throw new Error();

      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return res.status(422).send(
          failure(
            "Failed to Edit Review",
            validation.map((x) => x.msg)
          )
        );
      }
      const user = await userModel.findOne({ email: check.email });
      const { bookId, review } = req.body;
      const book = await bookModel.findOne({ _id: bookId });
      if (!book) {
        return res.status(404).send(failure("book is not Found!"));
      }
      const bookInReview = await reviewRatingModel
        .findOne({ book: bookId })
        .populate("book")
        .populate("reviews.user", "name");
      if (bookInReview) {
        const existingUser = bookInReview.reviews.find((x) =>
          x.user.equals(user._id)
        );
        if (!existingUser) {
          return res.status(400).send(failure("User has no review!"));
        }
        existingUser.review = review;
        await bookInReview.save();
        return res
          .status(200)
          .send(success("Review is Successfully Edited", existingUser));
      } else {
        return res.status(404).send(failure("404 Not Found"));
      }
    } catch (error) {
      if (error instanceof jsonwebtoken.TokenExpiredError) {
        return res.status(401).send(failure("Please Login Again!"));
      }
      if (error instanceof jsonwebtoken.JsonWebTokenError) {
        return res.status(401).send(failure("Token Invalid!"));
      }
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
  async removeReviewRating(req, res) {
    try {
      if (!req.headers.authorization)
        return res.status(401).send(failure("Unauthorized Access!"));
      const token = req.headers.authorization.split(" ")[1];
      const check = jsonwebtoken.verify(token, process.env.SECRET_KEY);
      if (!check) throw new Error();

      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return res.status(422).send(
          failure(
            "Failed to Edit Review",
            validation.map((x) => x.msg)
          )
        );
      }
      const user = await userModel.findOne({ email: check.email });
      const { bookId } = req.body;
      const book = await bookModel.findOne({ _id: bookId });
      if (!book) {
        return res.status(404).send(failure("Book is not Found!"));
      }
      const bookInReview = await reviewRatingModel.findOne({ book: bookId });
      if (bookInReview) {
        const reviewIndex = bookInReview.reviews.findIndex((x) =>
          x.user.equals(user._id)
        );
        if (reviewIndex === -1) {
          return res
            .status(404)
            .send(failure("User Review-Rating isn't Found!"));
        }
        if (bookInReview.reviews.length === 1) {
          await reviewRatingModel.deleteOne({ book: bookId });
          book.rating = 0;
          await book.save();
          return res
            .status(200)
            .send(success("Review and Rating is Successfully Removed", book));
        }
        bookInReview.totalRating =
          (bookInReview.totalRating * bookInReview.reviews.length -
            bookInReview.reviews[reviewIndex].rating) /
          (bookInReview.reviews.length - 1);
        bookInReview.reviews.splice(reviewIndex, 1);
        await bookInReview.save();
        book.rating = bookInReview.totalRating;
        await book.save();
        return res
          .status(200)
          .send(success("Review and Rating is Successfully Removed", book));
      } else {
        return res.status(404).send(failure("404 Not Found"));
      }
    } catch (error) {
      if (error instanceof jsonwebtoken.TokenExpiredError) {
        return res.status(401).send(failure("Please Login Again!"));
      }
      if (error instanceof jsonwebtoken.JsonWebTokenError) {
        return res.status(401).send(failure("Token Invalid!"));
      }
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
}

module.exports = new reviewRating();
