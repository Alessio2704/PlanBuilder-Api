const mongoose = require("mongoose");

const musclesSchema = new mongoose.Schema({

    muscles: {
        type: [String],
        unique : true
    },
    translation: {
        type: [Object]
    }
});

module.exports = mongoose.model("Muscles", musclesSchema);