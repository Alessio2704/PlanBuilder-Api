const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    gender: {
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
    age: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    height: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
});

module.exports = mongoose.model("Client", clientSchema);