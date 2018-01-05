const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName: String,
    googleId: String
});

module.exports = {
    User: mongoose.model("user", userSchema)
};
