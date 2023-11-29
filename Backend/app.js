const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const bookRoute = require("./routes/bookRoute");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const walletRoute = require("./routes/walletRoute");
const reviewRatingRoute = require("./routes/reviewRatingRoute");
const cartRoute = require("./routes/cartRoute");
const transRoute = require("./routes/transactionRoute");
const discountRoute = require("./routes/discountRoute");
const databaseConnection = require("./config/database");
const multer = require("multer");
const fileRoute = require("./routes/fileRoute");
const { failure } = require("./util/common");

dotenv.config();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("combined", { stream: accessLogStream }));
app.use("/book", bookRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/wallet", walletRoute);
app.use("/feedback", reviewRatingRoute);
app.use("/cart", cartRoute);
app.use("/trans", transRoute);
app.use("/discount", discountRoute);
app.use("/file", fileRoute);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send({ message: "Invaild JSON Format" });
  } else if (err instanceof multer.MulterError) {
    return res.status(404).send(failure("", err.message));
  } else {
    next(err);
  }
});
app.use((req, res) => {
  return res.status(400).send({ message: "Bad Request" });
});
databaseConnection(() => {
  app.listen(3000, () => {
    console.log("Server is running on 8000 port");
  });
});
