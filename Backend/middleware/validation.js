const { failure } = require("../util/common");
const jsonwebtoken = require("jsonwebtoken");

const validDate = (req, res, next) => {
  const { activeTime, endTime } = req.body;
  if (activeTime != undefined) {
    if (activeTime > Date.parse(endTime))
      return res.status(422).send(failure("Discount Time is Invalid"));
  } else {
    if (new Date() > Date.parse(endTime))
      return res.status(422).send(failure("Discount Time is Invalid"));
  }
  next();
};

module.exports = { validDate };
