const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName: String,
    googleId: String,
    profilePictureURL: String
});

module.exports = {
    User: mongoose.model("user", userSchema)
};
