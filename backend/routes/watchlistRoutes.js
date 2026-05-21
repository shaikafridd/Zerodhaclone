const express = require("express");
const router = express.Router();
const watchlistController = require("../controllers/watchlistController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/searchSymbol", authMiddleware, watchlistController.searchSymbol);
router.post("/watchlist/add", authMiddleware, watchlistController.addToWatchlist);
router.post("/watchlist/remove", authMiddleware, watchlistController.removeFromWatchlist);
router.get("/watchlist", authMiddleware, watchlistController.getWatchlist);

module.exports = router;
