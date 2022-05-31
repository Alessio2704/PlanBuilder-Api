const mongoose = require("mongoose");

const SkinfoldsMeasurementsModelSchema = new mongoose.Schema({

    tricep: {
        type: String
    },
    abdominal: {
        type: String
    },
    suprailiac: {
        type: String
    },
    subscapula: {
        type: String
    },
    midaxillary: {
        type: String
    },
    pectoral: {
        type: String
    },
    thigh: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports =  SkinfoldsMeasurementsModelSchema;