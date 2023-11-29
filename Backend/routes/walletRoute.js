const express = require("express");
const route = express();
const walletController = require("../controller/walletController");
const { isValid } = require("../middleware/validator");

route.post("/add-balance", isValid.addBalance, walletController.addBalance);
route.get("/balance", walletController.balanceCheck);

module.exports = route;
