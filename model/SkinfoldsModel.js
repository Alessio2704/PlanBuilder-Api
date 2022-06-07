const mongoose = require("mongoose");

const SkinfoldsMeasurementsModelSchema = new mongoose.Schema({

    client: {
        type: mongoose.Schema.Types.ObjectId, ref: "Client"
    },
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
        type: String
    }
});

module.exports = mongoose.model("Skinfold", SkinfoldsMeasurementsModelSchema);