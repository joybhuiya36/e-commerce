const express = require("express");
const route = express();
const userController = require("../controller/userController");
const { authentication, isAdmin } = require("../middleware/auth");
const { isValid } = require("../middleware/validator");

route.get("/all", authentication, isAdmin, userController.getAllUser);
route.delete("/delete/:id", authentication, isAdmin, userController.deleteUser);
route.patch(
  "/edit",
  authentication,
  isAdmin,
  isValid.userEditValidation,
  userController.editUser
);

module.exports = route;
