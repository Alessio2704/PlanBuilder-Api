const mongoose = require("mongoose");
const ClientModel = require("./Client")

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    clients: {
        type: [ClientModel]
    }
});

module.exports = mongoose.model("User", userSchema);