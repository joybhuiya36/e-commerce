const express = require("express");
const route = express();
const transactionController = require("../controller/transactionController");
const { authentication, isAdmin } = require("../middleware/auth");

route.get("/all", authentication, isAdmin, transactionController.getAllUsers);
route.get("/view", transactionController.getOneUser);

module.exports = route;
