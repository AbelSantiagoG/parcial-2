const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    current_password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        unique: true
    },
    active: {
        type: Boolean,
        default: false
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
