const discountModel = require("../model/discountModel");
const { validationResult } = require("express-validator");
const { success, failure } = require("../util/common");

class Discount {
  async addDiscount(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return res.status(422).send(
          failure(
            "Failed to Add Discount!",
            validation.map((x) => x.msg)
          )
        );
      }
      const { bookId, discountPercentage, activeTime, endTime } = req.body;
      const discount = await discountModel.findOne({ bookId: bookId });
      if (!discount) {
        const discountData = await discountModel.create({
          bookId,
          discountPercentage,
          activeTime,
          endTime,
        });
        return res
          .status(201)
          .send(success("Discount is Successfully Added!", discountData));
      } else {
        return res.status(401).send(failure("Book Discount is Already Added!"));
      }
    } catch (err) {
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
  async updateDiscount(req, res) {
    try {
      const { bookId, discountPercentage, activeTime, endTime } = req.body;
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return res.status(422).send(
          failure(
            "Failed to Add Discount!",
            validation.map((x) => x.msg)
          )
        );
      }
      const discount = await discountModel.findOne({ bookId: bookId });
      if (!discount) {
        return res.status(404).send(failure("Discount Not Found"));
      }
      if (discountPercentage) {
        discount.discountPercentage = discountPercentage;
      }
      if (activeTime) {
        discount.activeTime = activeTime;
      }
      if (endTime) {
        discount.endTime = endTime;
      }
      if (
        discountPercentage == undefined &&
        activeTime == undefined &&
        endTime == undefined
      ) {
        return res.status(204).send(success("No Data is Updated!"));
      }
      await discount.save();

      return res
        .status(201)
        .send(success("Discount is Successfully Updated!", discount));
    } catch (err) {
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
}

module.exports = new Discount();
