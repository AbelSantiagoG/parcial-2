const mongoose = require("mongoose");

const WorkerSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    work: {
        type: String,
        required: true,
        unique: true
    },
    type_document: {
        type: String,
        required: true
    },
    document_number: {
        type: String,
    }
});
const Worker = mongoose.model("Worker", WorkerSchema);

module.exports = Worker;
