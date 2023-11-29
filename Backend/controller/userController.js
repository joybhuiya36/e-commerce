const jsonwebtoken = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const userModel = require("../model/userModel");
const authModel = require("../model/authModel");
const { failure, success } = require("../util/common");

class User {
  async getAllUser(req, res) {
    try {
      const allUser = await userModel.find({});
      if (allUser.length > 0) {
        return res
          .status(200)
          .send(success("All User Data is Fetched!", allUser));
      } else {
        return res.status(404).send(success("No User Data is Found!"));
      }
    } catch (err) {
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deleteResult = await userModel.deleteOne({ _id: id });
      if (deleteResult.deletedCount) {
        await authModel.deleteOne({ user: id });
        return res.status(200).send(success("User is Deleted Successfully!"));
      } else {
        return res.status(404).send(failure("Failed to Delete User!"));
      }
    } catch (err) {
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
  async editUser(req, res) {
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
      const { id, name, email, phone, address } = req.body;
      const user = await userModel.findOne({ _id: id });
      if (name != undefined) user.name = name;
      if (email != undefined) user.email = email;
      if (phone != undefined) user.phone = phone;
      if (address != undefined) user.address = address;

      await user.save();
      if (
        name == undefined &&
        email == undefined &&
        phone == undefined &&
        address == undefined
      ) {
        return res.status(200).send(success("No Data is Updated!"));
      }
      return res
        .status(200)
        .send(success("User Data is Updated Successfully", user));
    } catch (err) {
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
}

module.exports = new User();
