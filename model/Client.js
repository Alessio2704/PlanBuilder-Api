const mongoose = require("mongoose");
const MeasurementsModel = require("./MeasurementsModel");
const SkinfoldsMeasurementsModel = require("./SkinfoldsModel");

const clientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    surname: {
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
    measurements: {
        type: [MeasurementsModel]
    },
    skinfolds: {
        type: [SkinfoldsMeasurementsModel]
    }
});

module.exports = mongoose.model("Client", userSchema);