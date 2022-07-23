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

    router.get("/", async (req, res) => {
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

    router.post("/data/:id", verify, async (req, res) => {  

      try {
      const movementPatterns = await MovementPattern.find({});

      const result = [];

      for (movement of movementPatterns) {

        if (movement.workedMuscles != null) {
          
          const item = {
            name: movement.name,
            workedMuscles: movement.workedMuscles
          }

          result.push(item);

        } 
      }
      
      res.send(result);

      } catch (error) {
        console.log(error);
        res.send({"message": "Error getting movement patterns data"});
      }
    });
  
  module.exports = router;