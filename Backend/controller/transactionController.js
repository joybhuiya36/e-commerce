const userModel = require("../model/userModel");
const transactionModel = require("../model/transactionModel");
const jsonwebtoken = require("jsonwebtoken");
const { success, failure } = require("../util/common");

class Transaction {
  async getAllUsers(req, res) {
    try {
      const trans = await transactionModel
        .find({})
        .populate("user", "-__v")
        .populate("books.book");
      if (trans.length > 0) {
        return res
          .status(200)
          .send(success("All Transactions are Fetched!", trans));
      }
      return res.status(200).send(success("No Transactions are Found!"));
    } catch (err) {
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
  async getOneUser(req, res) {
    try {
      if (!req.headers.authorization)
        return res.status(401).send(failure("Unauthorized Access!"));
      const token = req.headers.authorization.split(" ")[1];
      const check = jsonwebtoken.verify(token, process.env.SECRET_KEY);
      if (!check) throw new Error();

      const user = await userModel.findOne({ email: check.email });
      // console.log(user);
      const trans = await transactionModel
        .find({ user: user._id })
        .populate("user", "-__v -_id")
        .populate("books.book");
      if (trans.length > 0) {
        return res
          .status(200)
          .send(success("All Transactions are Fetched!", trans));
      }
      return res.status(200).send(success("No Transaction is Found!"));
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

module.exports = new Transaction();
