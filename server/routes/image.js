const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

router.post("/:user", imageController.uploadImage);

module.exports = router;
