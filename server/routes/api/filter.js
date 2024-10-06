const express = require("express");
const router = express.Router();
const filterController = require("../../controllers/filterController");

router.get("/price/", filterController.sortItemsByPrice);
router.get("/location/", filterController.sortItemsByLocation);

module.exports = router;
