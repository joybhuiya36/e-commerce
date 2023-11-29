const cartModel = require("../model/cartModel");
const userModel = require("../model/userModel");
const bookModel = require("../model/bookModel");
const walletModel = require("../model/walletModel");
const transactionModel = require("../model/transactionModel");
const discountModel = require("../model/discountModel");
const jsonwebtoken = require("jsonwebtoken");
const { success, failure } = require("../util/common");
const { validationResult } = require("express-validator");

class Cart {
  async addToCart(req, res) {
    try {
      const { bookId, amount } = req.body;
      //   console.log(req.headers.authorization);
      if (!req.headers.authorization)
        return res.status(401).send(failure("Unauthorized Access!"));
      const token = req.headers.authorization.split(" ")[1];
      const check = jsonwebtoken.verify(token, process.env.SECRET_KEY);
      if (check.role == 1) {
        return res.status(422).send(failure("Admin can't add to cart"));
      }
      if (!check) throw new Error();

      const validation = validationResult(req).array();
      //   console.log(validation);
      if (validation.length > 0) {
        return res.status(422).send(
          failure(
            "Failed to Add to Cart",
            validation.map((x) => x.msg)
          )
        );
      }
      const user = await userModel.findOne({ email: check.email });

      const book = await bookModel.findOne({ _id: bookId });
      if (!book) {
        return res.status(404).send(failure("Book doesn't Exist!"));
      }

      const userInCart = await cartModel.findOne({ user: user._id });
      //   console.log(userInCart);
      const discountBook = await discountModel.findOne({ bookId: bookId });
      let totalCost = 0;
      if (
        discountBook &&
        discountBook.activeTime <= new Date() &&
        discountBook.endTime >= new Date()
      ) {
        const cal = book.price * amount;
        totalCost += cal - (cal * discountBook.discountPercentage) / 100;
      } else {
        totalCost = book.price * amount;
      }
      if (userInCart) {
        const existingBook = userInCart.books.find((x) =>
          x.book.equals(bookId)
        );
        if (existingBook) {
          if (existingBook.quantity + amount > book.stock) {
            return res.status(401).send(failure("Out of Stock!"));
          }
          existingBook.quantity += amount;
          userInCart.total += totalCost;
          await userInCart.save();
        } else {
          if (amount > book.stock)
            return res.status(401).send(failure("Out of Stock!"));
          userInCart.books.push({ book: bookId, quantity: amount });
          userInCart.total += totalCost;
          await userInCart.save();
        }
        const populateData = await cartModel
          .findOne({ user: user._id })
          .populate("user", "-_id -__v")
          .populate("books.book", "title price -_id");
        return res
          .status(201)
          .send(
            success(
              "Book Added to the Existing Cart Successfully!",
              populateData
            )
          );
      } else {
        // console.log("else");
        if (amount > book.stock)
          return res.status(401).send(failure("Out of Stock!"));

        const newData = await cartModel.create({
          user: user._id,
          books: [{ book: bookId, quantity: amount }],
          total: totalCost,
        });
        const populateData = await cartModel
          .findOne({ user: user._id })
          .populate("user", "-_id -__v")
          .populate("books.book", "title price -_id");
        return res
          .status(201)
          .send(
            success("Book Added Newly to the Cart Successfully!", populateData)
          );
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
  async removeItem(req, res) {
    try {
      const { bookId, amount } = req.body;
      if (!req.headers.authorization)
        return res.status(401).send(failure("Unauthorized Access!"));
      const token = req.headers.authorization.split(" ")[1];
      const check = jsonwebtoken.verify(token, process.env.SECRET_KEY);
      if (!check) throw new Error();

      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return res.status(200).send(
          failure(
            "Failed to Add to Cart",
            validation.map((x) => x.msg)
          )
        );
      }
      const user = await userModel.findOne({ email: check.email });

      const book = await bookModel.findOne({ _id: bookId });
      if (!book) {
        return res.status(404).send(failure("Book doesn't Exist!"));
      }
      const userInCart = await cartModel.findOne({ user: user._id });
      if (userInCart) {
        const bookIndex = userInCart.books.findIndex((x) => x.book == bookId);
        if (bookIndex === -1) {
          return res
            .status(404)
            .send(failure("Book is not Found in the Cart!"));
        }

        if (userInCart.books[bookIndex].quantity < amount) {
          return res
            .status(401)
            .send(failure("Book does not exist in the Cart Enough Times!"));
        } else if (userInCart.books[bookIndex].quantity == amount) {
          console.log(userInCart.books.length);
          if (userInCart.books.length === 1) {
            const deletionResult = await cartModel.deleteOne({
              user: user._id,
            });
            if (deletionResult.deletedCount > 0) {
              return res
                .status(200)
                .send(success("Book is Successfully Removed!"));
            }
          }
          userInCart.books.splice(bookIndex, 1);
          let totalCost = 0;
          for (const cartItem of userInCart.books) {
            const bookData = await bookModel.findOne({
              _id: cartItem.book,
            });
            const discountBook = await discountModel.findOne({
              bookId: cartItem.book,
            });
            if (
              discountBook &&
              discountBook.activeTime <= new Date() &&
              discountBook.endTime >= new Date()
            ) {
              const cal = bookData.price * cartItem.quantity;
              totalCost += cal - (cal * discountBook.discountPercentage) / 100;
            } else totalCost += bookData.price * cartItem.quantity;
          }
          userInCart.total = totalCost;
          userInCart.save();
          return res
            .status(200)
            .send(
              success("Book is Successfully Removed from the Cart!", userInCart)
            );
        } else if (userInCart.books[bookIndex].quantity > amount) {
          userInCart.books[bookIndex].quantity -= amount;
          let totalCost = 0;
          for (const cartItem of userInCart.books) {
            const bookData = await bookModel.findOne({
              _id: cartItem.book,
            });
            const discountBook = await discountModel.findOne({
              bookId: cartItem.book,
            });
            if (
              discountBook &&
              discountBook.activeTime <= new Date() &&
              discountBook.endTime >= new Date()
            ) {
              const cal = bookData.price * cartItem.quantity;
              totalCost += cal - (cal * discountBook.discountPercentage) / 100;
            } else totalCost += bookData.price * cartItem.quantity;
          }
          userInCart.total = totalCost;
          userInCart.save();
          return res
            .status(200)
            .send(success("Book is reduced in the Cart!", userInCart));
        }
      } else {
        res.status(404).send(failure("This User Cart doesn't Found!"));
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
  async viewCart(req, res) {
    try {
      if (!req.headers.authorization)
        return res.status(401).send(failure("Unauthorized Access!"));
      const token = req.headers.authorization.split(" ")[1];
      const check = jsonwebtoken.verify(token, process.env.SECRET_KEY);
      if (!check) throw new Error();
      const user = await userModel.findOne({ email: check.email });
      const cart = await cartModel
        .findOne({ user: user._id })
        .populate("user", "name -_id")
        .populate("books.book", "title price -_id");
      if (!cart) {
        return res.status(404).send(success("Cart for this user not found!"));
      }
      const viewCart = cart.toObject();
      delete viewCart._id;
      delete viewCart.__v;
      return res
        .status(200)
        .send(success("Cart Data is Successfully Fetched!", viewCart));
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
  async checkout(req, res) {
    try {
      if (!req.headers.authorization)
        return res.status(401).send(failure("Unauthorized Access!"));
      const token = req.headers.authorization.split(" ")[1];
      const check = jsonwebtoken.verify(token, process.env.SECRET_KEY);
      if (check.role == 1) {
        return res.status(422).send(failure("Admin can't checkout"));
      }
      if (!check) throw new Error();
      const user = await userModel.findOne({ email: check.email });
      const userInCart = await cartModel.findOne({ user: user._id });
      if (!userInCart) {
        return res
          .status(404)
          .send(failure("Cart is not found for this user!"));
      }
      const wallet = await walletModel.findOne({ user: user._id });
      let totalCost = 0;
      for (const cartItem of userInCart.books) {
        const bookData = await bookModel.findOne({
          _id: cartItem.book,
        });
        if (bookData.stock < cartItem.quantity) {
          return res.status(401).send(failure("Book is Out of Stock!"));
        }
        const discountBook = await discountModel.findOne({
          bookId: cartItem.book,
        });
        if (
          discountBook &&
          discountBook.activeTime <= new Date() &&
          discountBook.endTime >= new Date()
        ) {
          const cal = bookData.price * cartItem.quantity;
          totalCost += cal - (cal * discountBook.discountPercentage) / 100;
        } else totalCost += bookData.price * cartItem.quantity;
      }
      if (totalCost > wallet.balance) {
        return res.status(422).send(failure("Insufficient Balance!"));
      }
      for (const cartItem of userInCart.books) {
        const bookData = await bookModel.findOne({
          _id: cartItem.book,
        });
        bookData.stock -= cartItem.quantity;
        await bookData.save();
      }

      wallet.balance -= totalCost;
      await wallet.save();
      const trans = await transactionModel.create({
        cart: userInCart._id,
        user: user._id,
        books: userInCart.books,
        total: totalCost,
      });
      const populateData = await transactionModel
        .findOne({ cart: userInCart._id })
        .populate("user", "-_id -__v")
        .populate("books.book", "title price -_id");

      const deletionResult = await cartModel.deleteOne({ user: user._id });
      if (deletionResult.deletedCount)
        return res
          .status(200)
          .send(success("Successfully Checked Out!", populateData));
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

module.exports = new Cart();
