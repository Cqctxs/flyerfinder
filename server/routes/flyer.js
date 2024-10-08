const express = require("express");
const router = express.Router();
const flyerController = require("../controllers/flyerController");

router.get("/", flyerController.getFlyers);
router.post("/", flyerController.addFlyer);
router.get("/:id", flyerController.getFlyerFromID);

module.exports = router;
