const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({

    imageURL: {
        type: String,
    },
    imageKey: {
        type: String
    },
    bodyPart: {
        type:String,
    },
    date: {
        type: String,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId, ref: "Client"
    }
});

module.exports = mongoose.model("Image", imageSchema);