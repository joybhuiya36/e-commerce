const path = require("path");
const fileTypes = require("../constants/fileTypes");
const { success, failure } = require("../util/common");
const fs = require("fs");

class FileController {
  async uploadFile(req, res) {
    try {
      if (!fileTypes.includes(req.file_extension)) {
        return res.status(404).send(failure("Only .jpg, .jpeg, .png"));
      }

      if (!req.file) {
        return res.status(404).send(failure("Failed to upload file"));
      }
      return res
        .status(200)
        .send(success("File is Uploaded Successfully", req.file));
    } catch (error) {
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }

  async getFile(req, res) {
    try {
      const { filepath } = req.params;
      const exists = fs.existsSync(
        path.join(__dirname, "..", "server", filepath)
      );

      if (!exists) {
        return res.status(404).send(failure("File isn't Found"));
      }
      return res
        .status(200)
        .sendFile(path.join(__dirname, "..", "server", filepath));
    } catch (error) {
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
}

module.exports = new FileController();
