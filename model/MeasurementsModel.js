const mongoose = require("mongoose");

const MeasurementsSchema = new mongoose.Schema({

    client: {
        type: mongoose.Schema.Types.ObjectId, ref: "Client"
    },
    weight: {
        type: String
    },
    ankleDx: {
        type: String
    },
    ankleSx: {
        type: String
    },
    calfDx: {
        type: String
    },
    calfSx: {
        type: String
    },
    upperThighDx: {
        type: String
    },
    upperThighSx: {
        type: String
    },
    middleThighDx: {
        type: String
    },
    middleThighSx: {
        type: String
    },
    flanks: {
        type: String
    },
    lowerBellyButton: {
        type: String
    },
    bellyButton: {
        type: String
    },
    waist: {
        type: String
    },
    chest: {
        type: String
    },
    shoulders: {
        type: String
    },
    neck: {
        type: String
    },
    armDx: {
        type: String
    },
    armSx: {
        type: String
    },
    wristDx: {
        type: String
    },
    wristSx: {
        type: String
    },
    date: {
        type: String
    }
});

module.exports = mongoose.model("Measurement", MeasurementsSchema);