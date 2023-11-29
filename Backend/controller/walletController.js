const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../model/userModel");
const walletModel = require("../model/walletModel");
const { validationResult } = require("express-validator");
const { failure, success } = require("../util/common");

class Wallet {
  async addBalance(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return res.status(422).send(
          failure(
            "Invalid Input Provided",
            validation.map((x) => x.msg)
          )
        );
      }
      const { amount } = req.body;
      if (!req.headers.authorization)
        return res.status(401).send(failure("Unauthorized Access!"));
      const token = req.headers.authorization.split(" ")[1];
      const check = jsonwebtoken.verify(token, process.env.SECRET_KEY);
      if (check) {
        const user = await userModel.findOne({ email: check.email });
        const userWallet = await walletModel
          .findOne({ user: user._id })
          .populate("user", "name");
        userWallet.balance += amount;
        await userWallet.save();
        return res.status(200).send(
          success("Balance Added!", {
            name: userWallet.user.name,
            balance: userWallet.balance,
          })
        );
      } else throw new Error();
    } catch (error) {
      if (error instanceof jsonwebtoken.TokenExpiredError) {
        return res.status(401).send(failure("Please Login Again!"));
      }
      if (error instanceof jsonwebtoken.JsonWebTokenError) {
        return res.status(401).send(failure("Token Invalid!"));
      }
      return res.status(500).send(failure("Something Went Wrong!"));
    }
  }
  async balanceCheck(req, res) {
    try {
      if (!req.headers.authorization)
        return res.status(401).send(failure("Unauthorized Access!"));
      const token = req.headers.authorization.split(" ")[1];
      const check = jsonwebtoken.verify(token, process.env.SECRET_KEY);
      if (check) {
        const user = await userModel.findOne({ email: check.email });
        const userWallet = await walletModel
          .findOne({ user: user._id })
          .populate("user", "name");
        return res.status(200).send(
          success("Balance Data is Fetched!", {
            name: userWallet.user.name,
            balance: userWallet.balance,
          })
        );
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error instanceof jsonwebtoken.TokenExpiredError) {
        return res.status(401).send(failure("Please Login Again!"));
      }
      if (error instanceof jsonwebtoken.JsonWebTokenError) {
        return res.status(401).send(failure("Token Invalid!"));
      }
      return res.status(500).send(failure("Something Went Wrong!"));
    }
  }
}

module.exports = new Wallet();
