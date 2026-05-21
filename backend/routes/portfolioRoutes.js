const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/allHoldings", authMiddleware, portfolioController.allHoldings);
router.get("/allPositions", authMiddleware, portfolioController.allPositions);
router.get("/indexIndices", portfolioController.indexIndices);

module.exports = router;
