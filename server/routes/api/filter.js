const express = require("express");
const router = express.Router();
const filterController = require("../../controllers/filterController");

router.get("/", filterController.sortItemsByPrice);

module.exports = router;
