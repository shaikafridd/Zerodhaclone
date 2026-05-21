const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");
const JWT_SECRET = process.env.JWT_SECRET || "zerodha_super_secret_key";

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists", success: false });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ username, email, password: hashedPassword });
        await user.save();

        const isProduction = process.env.NODE_ENV === "production";
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        });

        res.json({ message: "Signup successful", success: true });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials", success: false });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ message: "Invalid credentials", success: false });

        const isProduction = process.env.NODE_ENV === "production";
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        });

        res.json({ message: "Login successful", success: true });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

exports.logout = (req, res) => {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    });
    res.json({ message: "Logged out", success: true });
};

exports.authStatus = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, message: "Authenticated", user: { id: user._id, username: user.username, email: user.email, balance: user.balance } });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error retrieving user info" });
    }
};
