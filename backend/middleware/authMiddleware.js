const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "zerodha_super_secret_key";

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized", success: false });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token", success: false });
    }
};

module.exports = authMiddleware;
