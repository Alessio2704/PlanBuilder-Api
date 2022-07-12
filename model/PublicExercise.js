const mongoose = require("mongoose");

const publicExerciseSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    movementPattern: {
        type: String,
        enum : [ 'Squat', "Hip Hinge", 'Core', 'Horizontal Push', 'Vertical Push', 'Horizontal Pull', 'Vertical Pull', 'Mobility','Stretching','Isolation' ]
    },
    variations: {
        type: [Object]
    },
    workedMuscles: {
        type: Object
    },
    tempo: {
        type: [String],
        default: ['Isokinetic', '2sec Pause', '5sec Pause', '5sec Up 5sec Down', 'Slow Negative', '5sec Negative', 'Explosive Concentric']
    },
    equipment: {
        type: [String],
        default: ['Chains', 'Bands','Board', 'Pins', 'Box',]
    }
});

module.exports = mongoose.model("PublicExercise", publicExerciseSchema);