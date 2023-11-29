const express = require("express");
const route = express();
const bookController = require("../controller/bookController");
const { authentication, isAdmin } = require("../middleware/auth");
const { isValid } = require("../middleware/validator");

route.get("/all", bookController.getAll);
route.get("/filter", bookController.getAllByFilter);
route.post("/create", isValid.bookAddValidation, bookController.create);
route.delete("/delete/:id", bookController.deleteBook);
route.patch("/edit", isValid.bookEditValidation, bookController.editBook);

module.exports = route;
