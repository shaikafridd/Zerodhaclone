const express = require("express");
const router = express.Router();
const fundsController = require("../controllers/fundsController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/addFunds", authMiddleware, fundsController.addFunds);
router.post("/withdrawFunds", authMiddleware, fundsController.withdrawFunds);

module.exports = router;
