const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/newOrder", authMiddleware, orderController.newOrder);
router.get("/allOrders", authMiddleware, orderController.allOrders);

module.exports = router;
