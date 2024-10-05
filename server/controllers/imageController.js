const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images"));
  },
  filename: function (req, file, cb) {
    const user = req.params.user; // Extract the user parameter from the request URL
    cb(null, user + ".png");
  },
});

const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 1000000000 },
}).single("image");

module.exports = { uploadImage };
