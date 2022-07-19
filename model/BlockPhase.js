const mongoose = require("mongoose");

const blockPhaseSchema = new mongoose.Schema({

    name: {
        type: String,
        unique : true
    },
    translation: {
        type: [Object]
    }
});

module.exports = mongoose.model("BlockPhase", blockPhaseSchema);