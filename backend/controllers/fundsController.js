const { UserModel } = require("../models/UserModel");

exports.addFunds = async (req, res) => {
    try {
        const amount = Number(req.body.amount);
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid amount" });
        }
        const user = await UserModel.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        
        user.balance = (user.balance || 0) + amount;
        await user.save();
        res.json({ success: true, message: "Funds added successfully", balance: user.balance });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error adding funds" });
    }
};

exports.withdrawFunds = async (req, res) => {
    try {
        const amount = Number(req.body.amount);
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid amount" });
        }
        const user = await UserModel.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        
        if ((user.balance || 0) < amount) {
            return res.status(400).json({ success: false, message: "Insufficient funds" });
        }
        
        user.balance = (user.balance || 0) - amount;
        await user.save();
        res.json({ success: true, message: "Funds withdrawn successfully", balance: user.balance });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error withdrawing funds" });
    }
};
