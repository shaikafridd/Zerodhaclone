const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    isLoss: Boolean,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
});

module.exports = { HoldingsSchema };
