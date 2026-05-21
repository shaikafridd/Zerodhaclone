const { OrdersModel } = require("../models/OrdersModel");
const { UserModel } = require("../models/UserModel");
const { HoldingsModel } = require("../models/HoldingsModel");
const { PositionsModel } = require("../models/PositionsModel");

exports.newOrder = async (req, res) => {
    try {
        const { name, qty, price, mode, product } = req.body;
        const quantity = Number(qty);
        const rate = Number(price);
        const prod = product || "MIS";

        if (isNaN(quantity) || quantity <= 0 || isNaN(rate) || rate <= 0) {
            return res.status(400).send("Invalid quantity or price");
        }

        const totalCost = quantity * rate;
        const user = await UserModel.findById(req.user.id);
        if (!user) return res.status(404).send("User not found");

        if (mode === "BUY") {
            if ((user.balance || 0) < totalCost) {
                return res.status(400).send("Insufficient funds to place this order");
            }
            user.balance = (user.balance || 0) - totalCost;

            if (prod === "CNC") {
                // Holdings logic
                let holding = await HoldingsModel.findOne({ userId: req.user.id, name: name });
                if (holding) {
                    holding.avg = ((holding.qty * holding.avg) + (quantity * rate)) / (holding.qty + quantity);
                    holding.qty += quantity;
                    await holding.save();
                } else {
                    await new HoldingsModel({
                        name: name,
                        qty: quantity,
                        avg: rate,
                        price: rate,
                        net: "0.00%",
                        day: "0.00%",
                        isLoss: false,
                        userId: req.user.id
                    }).save();
                }
            } else {
                // Intraday Positions logic
                let position = await PositionsModel.findOne({ userId: req.user.id, name: name, product: "MIS" });
                if (position) {
                    position.avg = ((position.qty * position.avg) + (quantity * rate)) / (position.qty + quantity);
                    position.qty += quantity;
                    await position.save();
                } else {
                    await new PositionsModel({
                        product: "MIS",
                        name: name,
                        qty: quantity,
                        avg: rate,
                        price: rate,
                        net: "0.00%",
                        day: "0.00%",
                        isLoss: false,
                        userId: req.user.id
                    }).save();
                }
            }
        } else if (mode === "SELL") {
            if (prod === "CNC") {
                let holding = await HoldingsModel.findOne({ userId: req.user.id, name: name });
                if (!holding || holding.qty < quantity) {
                    return res.status(400).send("Insufficient holdings to place this sell order");
                }
                holding.qty -= quantity;
                if (holding.qty === 0) {
                    await HoldingsModel.deleteOne({ _id: holding._id });
                } else {
                    await holding.save();
                }
            } else {
                // Intraday Positions logic (selling/shorting)
                let position = await PositionsModel.findOne({ userId: req.user.id, name: name, product: "MIS" });
                if (position) {
                    position.qty -= quantity;
                    if (position.qty === 0) {
                        await PositionsModel.deleteOne({ _id: position._id });
                    } else {
                        await position.save();
                    }
                } else {
                    await new PositionsModel({
                        product: "MIS",
                        name: name,
                        qty: -quantity,
                        avg: rate,
                        price: rate,
                        net: "0.00%",
                        day: "0.00%",
                        isLoss: false,
                        userId: req.user.id
                    }).save();
                }
            }
            user.balance = (user.balance || 0) + totalCost;
        }

        let newOrder = new OrdersModel({
            name: name,
            qty: quantity,
            price: rate,
            mode: mode,
            product: prod,
            userId: req.user.id,
        });

        await newOrder.save();
        await user.save();
        res.send("Order saved!");
    } catch (err) {
        console.error("newOrder Error:", err);
        res.status(500).send("Error saving order");
    }
};

exports.allOrders = async (req, res) => {
    try {
        let allOrders = await OrdersModel.find({ userId: req.user.id });
        res.json(allOrders);
    } catch (err) {
        res.status(500).send("Error fetching orders");
    }
};
