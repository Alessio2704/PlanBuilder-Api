const mongoose = require("mongoose");

const movementPatternSchema = new mongoose.Schema({

    name: {
        type: String,
        enum : [ 'Squat', "Hip Hinge", 'Core', 'Horizontal Push', 'Vertical Push', 'Horizontal Pull', 'Vertical Pull', 'Mobility','Stretching',
        'Isolation-Chest','Isolation-Back', 'Isolation-Biceps','Isolation-Triceps',
        'Isolation-Front-Delts','Isolation-Rear-Delts','Isolation-Mid-Delts','Isolation-Quadriceps',
        'Isolation-Hamstrings','Isolation-Glutes','Isolation-Calves'],
        unique : true,
    },
    workedMuscles: {
        type: Object
    },
    translation: {
        type: [Object]
    }
});

module.exports = mongoose.model("MovementPattern", movementPatternSchema);