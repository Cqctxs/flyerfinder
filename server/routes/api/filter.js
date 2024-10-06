const express = require("express");
const router = express.Router();
const filterController = require("../../controllers/filterController");

router.get("/price/:product", filterController.sortItemsByPrice);
router.post("/location/:product", filterController.sortItemsByLocation);

module.exports = router;
