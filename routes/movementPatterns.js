const router = require("express").Router();
const verify = require("./verifyToken");
const MovementPattern = require("../model/MovementPattern");
  
  router.post("/:id", verify, async (req, res) => {
      try {
          const newMovementPattern = new MovementPattern({
              name: req.body.name,
              workedMuscles: req.body.workedMuscles,
              translation: req.body.translation,
          });
  
          const savedMovementPattern = await newMovementPattern.save();
  
          res.send({ message: "New movement pattern added succesfully"});
    
      } catch (error) {
        console.log(error);
        res.send({ message: "Error saving movement pattern"});
      }
    });

    router.put("/:id", verify, async (req, res) => {
      try {
          
          const languageCode = req.query.language
          const movementPatterns = await  MovementPattern.find({});

          var result = [];
  
          for (const movementPattern of movementPatterns) {

            var name = "";

            if (languageCode != "EN") {
             const translationArray = movementPattern.translation.filter(function (el) {
                return el.code === languageCode;
              });
  
              if (translationArray.length > 0) {
                name = translationArray[0].translation;
              } else {
                name = movementPattern.name
              }
            } else {
              name = movementPattern.name
            }

            const patternOBJ = {
              nameIdentifier: movementPattern.name,
              name: name
            }

            result.push(patternOBJ);
          }
  
          res.send(result);
    
      } catch (error) {
        console.log(error);
        res.send({ message: "Error saving movement pattern"});
      }
    });
  
  module.exports = router;