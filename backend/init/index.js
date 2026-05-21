require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require("mongoose");
const { HoldingsModel } = require("../models/HoldingsModel");
const { PositionsModel } = require("../models/PositionsModel");
const { WatchlistModel } = require("../models/WatchlistModel");
const { holdings, positions, watchlist } = require("./data");

const uri = process.env.MONGO_URL;

async function initDB() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully");

        // Clear existing data
        await HoldingsModel.deleteMany({});
        await PositionsModel.deleteMany({});
        await WatchlistModel.deleteMany({});
        console.log("Cleared existing data");

        // Insert new data
        await HoldingsModel.insertMany(holdings);
        await PositionsModel.insertMany(positions);
        await WatchlistModel.insertMany(watchlist);
        console.log("Successfully initialized database with all dummy data!");

        mongoose.connection.close();
    } catch (err) {
        console.error("Error initializing database:", err.message);
        process.exit(1);
    }
}

initDB();
