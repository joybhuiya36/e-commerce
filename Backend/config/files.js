const multer = require("multer");
const fileTypes = require("../constants/fileTypes");
const path = require("path");

const upload = multer({
  limits: {
    fileSize: 104857600,
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      if (file) {
        callback(null, "./server");
      } else {
        req.file.error = "No file was found";
        callback("No file was found", null);
      }
    },
    filename: (req, file, callback) => {
      if (file) {
        // console.log(req.params.id);
        callback(null, req.params.id + path.extname(file.originalname)); //renaming
      } else {
        callback("No file was found", null);
      }
    },
  }),
  fileFilter: (req, file, callback) => {
    if (file) {
      const extension = path.extname(file.originalname);
      req.file_extension = extension;
      if (fileTypes.includes(extension)) {
        callback(null, true);
      } else {
        callback("No file is found", false);
      }
    }
  },
});

module.exports = upload;
