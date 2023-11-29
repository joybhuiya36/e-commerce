const express = require("express");
const routes = express();
const upload = require("../config/files");
const FileController = require("../controller/fileController");

routes.post(
  "/upload-file/:id",
  upload.single("file_to_upload"),
  FileController.uploadFile
);
routes.get("/get/:filepath", FileController.getFile);

module.exports = routes;
