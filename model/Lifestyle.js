const { bool } = require("joi");
const mongoose = require("mongoose");

const lifestyleSchema = new mongoose.Schema({

    steps: {
        type: String,
        enum : ['low','medium','high'],
        default: 'low'
    },
    work: {
        type: String,
        enum : ['physical','desk','none'],
        default: 'physical'
    },
    sleep: {
        type: Boolean
    },
    smoke: {
        type: Boolean
    },
    alcohol: {
        type: Boolean
    },
    diet: {
        type: String,
        enum : ['balanced','unbalanced','planned'],
        default: 'balanced'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId, ref: "Client"
    }
});

module.exports = mongoose.model("Lifestyle", lifestyleSchema);