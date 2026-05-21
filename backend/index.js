require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const fundsRoutes = require("./routes/fundsRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const orderRoutes = require("./routes/orderRoutes");

const PORT = process.env.PORT || 3002;
const app = express();

// Trust proxy to allow secure cookies behind reverse proxies (like Render)
app.set("trust proxy", 1);

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.FRONTEND_URL,
    process.env.DASHBOARD_URL
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use("/", authRoutes);
app.use("/", fundsRoutes);
app.use("/", watchlistRoutes);
app.use("/", portfolioRoutes);
app.use("/", orderRoutes);

// Start Database and Server
if (process.env.NODE_ENV !== 'test') {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT} in MVC mode`);
        });
    });
}

module.exports = app;