const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
    service_name: {
        type: String,
        required: true
    },
    service_description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String
    }
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;