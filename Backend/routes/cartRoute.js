const express = require("express");
const route = express();
const cartController = require("../controller/cartController");
const { isValid } = require("../middleware/validator");

route.post("/addtocart", isValid.addToCart, cartController.addToCart);
route.post("/remove", isValid.addToCart, cartController.removeItem);
route.get("/view", cartController.viewCart);
route.post("/checkout", cartController.checkout);

module.exports = route;
