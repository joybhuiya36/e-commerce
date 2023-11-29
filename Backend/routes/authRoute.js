const express = require("express");
const route = express();
const authController = require("../controller/authController");
const { authValidator } = require("../middleware/validator");

route.post("/signup", authValidator.signup, authController.signup);
route.post("/login", authValidator.login, authController.login);
route.post("/forget-password", authController.forgetPassMail);
route.post("/reset-password", authController.resetPassword);
route.post("/reset-request", authController.validPasswordResetReq);

module.exports = route;
