const router = require("express").Router();
const verify = require("./verifyToken");
const PublicExercise = require("../model/PublicExercise");
const MovementPattern = require("../model/MovementPattern");

router.get("/", async (req, res) => {
  try {

   const exercises = await PublicExercise.find({});

   const languageCode = req.query.language;

   const result = [];

   for (const exercise of exercises) {

        var name = ""
        var movementPattern = ""
        var variations = []

        if (languageCode !== "EN") {

          const translationArray = exercise.translation.filter(function (el) {
            return el.code === languageCode;
          });

           exercise.variationsTranslation.forEach(function (el) {
                    const elements = el.translation.filter(function (el) {
                     return el.code === languageCode;
                  });

                  if (elements.length > 0) { 
                    variations.push(elements[0].translation)
                  } else {
                    variations = exercise.variations
                  }
          });

          const movementPatternDB = await MovementPattern.findOne({ _id: exercise.movementPattern });

          const movementPatternDBTranslation = movementPatternDB.translation.filter(function (el) {
            return el.code === languageCode;
          });

          if (translationArray.length > 0) {
            name = translationArray[0].translation;
          } else {
            name = exercise.name
          }

          if (movementPatternDBTranslation.length > 0) {
            movementPattern = movementPatternDBTranslation[0].translation
          } else {
            movementPattern = exercise.movementPatternName;
          }

        } else {
          name = exercise.name
          movementPattern = exercise.movementPatternName
          variations = exercise.variations
        }

        const exerciseResult = {
            name: name,
            movementPatternName: movementPattern,
            variations: variations,
        }

        result.push(exerciseResult);
   }

   res.send(result);

  } catch (error) {
    console.log(error)
    res.send({ message: "Error getting public exercises"});
  }
});

router.post("/:id", verify, async (req, res) => {
    try {
  
      const movementPattern = await MovementPattern.findOne({ name: req.body.movementPatternName });

        const newExercise = new PublicExercise({
            name: req.body.name,
            movementPatternName: req.body.movementPatternName,
            movementPattern: movementPattern._id,
            variations: req.body.variations,
            translation: req.body.translation,
            variationsTranslation: req.body.variationsTranslation
        });

        const savedExercise = await newExercise.save();

        res.send({ message: "New exercise added succesfully"});
  
    } catch (error) {
      console.log(error);
      res.send({ message: "Error saving public exercises"});
    }
  });

module.exports = router;