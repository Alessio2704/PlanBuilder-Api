const router = require("express").Router();
const verify = require("./verifyToken");
const PublicExercise = require("../model/PublicExercise");


router.get("/", async (req, res) => {
  try {

   const exercises = await PublicExercise.find({});

   const result = [];

   for (const exercise of exercises) {

        const exerciseResult = {
            name: exercise.name,
            movementPattern: exercise.movementPattern,
            variations: exercise.variations,
            workedMuscles: exercise.workedMuscles,
            tempo : exercise.tempo,
            equipment: exercise.equipment,
            translation: exercise.translation,
            varitionsTransition: exercise.varitionsTransition
        }

        result.push(exerciseResult);
   }

   res.send(result);

  } catch (error) {
    res.send({ message: "Error getting public exercises"});
  }
});

router.post("/:id", verify, async (req, res) => {
    try {
  
        const newExercise = new PublicExercise({
            name: req.body.name,
            movementPattern: req.body.movementPattern,
            variations: req.body.variations,
            workedMuscles: req.body.workedMuscles,
            translation: req.body.translation,
            varitionsTransition: req.body.varitionsTransition
        });

        const savedExercise = await newExercise.save();

        res.send({ message: "New exercise added succesfully"});
  
    } catch (error) {
      console.log(error);
      res.send({ message: "Error saving public exercises"});
    }
  });

module.exports = router;