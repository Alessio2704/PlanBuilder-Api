const mongoose = require("mongoose");

const skinfoldPartsSchema = new mongoose.Schema({

    skinfoldParts: {
        type: [String],
        unique : true
    },
    translation: {
        type: [Object]
    }
});

module.exports = mongoose.model("SkinfoldParts", skinfoldPartsSchema);