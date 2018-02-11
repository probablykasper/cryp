const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    type: String,
    buy: {
        amount: String,
        currency: String
    },
    sell: {
        amount: String,
        currency: String
    },
    fee: {
        amount: String,
        currency: String
    },
    exchange: String,
    group: String,
    note: String,
    date: String,
}, { typeKey: "$Type", _id: false });

const userSchema = new Schema({
    displayName: String,
    googleId: String,
    profilePictureURL: String,
    transactions: [transactionSchema],
}, { typeKey: "$Type" });

const candlestickSchema = new Schema({
    fromSymbol: String,
    toSymbol: String,
    date: Date,
    timeframe: String,
    open: String,
    high: String,
    low: String,
    close: String,
});

module.exports = {
    User: mongoose.model("User", userSchema),
    Candlestick: mongoose.model("Candlestick", candlestickSchema),
};
