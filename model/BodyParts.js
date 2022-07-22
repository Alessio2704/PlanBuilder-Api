const mongoose = require("mongoose");

const bodyPartsSchema = new mongoose.Schema({

    bodyParts: {
        type: [String],
        unique : true
    },
    translation: {
        type: [Object]
    }
});

module.exports = mongoose.model("BodyParts", bodyPartsSchema);