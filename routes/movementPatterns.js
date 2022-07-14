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
  
  module.exports = router;