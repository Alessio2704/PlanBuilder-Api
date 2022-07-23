const mongoose = require("mongoose");

const translationItemsSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true
    },
    values: {
        type: [String]
    },
    translation: {
        type: [Object]
    }
});

module.exports = mongoose.model("TranslationItems", translationItemsSchema);