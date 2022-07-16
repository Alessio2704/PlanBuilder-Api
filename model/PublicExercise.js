const mongoose = require("mongoose");
const MovementPattern = require("../model/MovementPattern");

const publicExerciseSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true
    },
    movementPatternName: {
        type: String,
        enum : [ 'Squat', "Hip Hinge", 'Core', 'Horizontal Push', 'Vertical Push', 'Horizontal Pull', 'Vertical Pull', 'Mobility','Stretching','Stability','Breathing',
        'Isolation-Chest','Isolation-Back', 'Isolation-Biceps','Isolation-Triceps',
        'Isolation-Front-Delts','Isolation-Rear-Delts','Isolation-Mid-Delts','Isolation-Quadriceps',
        'Isolation-Hamstrings','Isolation-Glutes','Isolation-Calves'],
        required: true
    },
    movementPattern: {
        type: mongoose.Schema.Types.ObjectId, ref: "MovementPattern"
    },
    variations: {
        type: [String]
    },
    translation: {
        type: [Object]
    },
    variationsTranslation: {
        type: [Object]
    }
});

module.exports = mongoose.model("PublicExercise", publicExerciseSchema);