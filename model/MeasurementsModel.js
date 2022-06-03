const mongoose = require("mongoose");

const MeasurementsModelSchema = new mongoose.Schema({

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
        type: Date,
        default: Date.now
    }
});

module.exports.measurementsModelSchema =  MeasurementsModelSchema;
module.exports.measurementsModel = mongoose.model("MeasurementsModel", MeasurementsModelSchema);