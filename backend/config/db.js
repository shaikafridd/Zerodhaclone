const mongoose = require("mongoose");

const connectDB = async () => {
    const uri = process.env.MONGO_URL;
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully via MVC config!");
    } catch (err) {
        console.error("MongoDB connection failed! Error:", err.message);
        console.log("Check your internet connection, or verify if your MongoDB Atlas cluster allows your IP address.");
        process.exit(1);
    }
};

module.exports = connectDB;
