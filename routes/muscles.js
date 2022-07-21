const router = require("express").Router();
const verify = require("./verifyToken");
const Muscles = require("../model/Muscles");
  
  router.post("/:id", verify, async (req, res) => {
      try {
          const newMuscles = new Muscles({
              muscles: req.body.muscles,
              translation: req.body.translation
          });
  
          const savedMuscles= await newMuscles.save();
  
          res.send({ message: "New muscles array saved successfully"});
    
      } catch (error) {
        console.log(error);
        res.send({ message: "Error saving muscles array"});
      }
    });

    router.get("/", async (req, res) => {
        try {
            const muscles = await Muscles.find({});
    
            const languageCode = req.query.language;

            result = {};

            if (languageCode != "EN") {

                const translationArray = muscles[0].translation.filter( (el) => {
                    return el.code === languageCode
                });

                if (translationArray.length > 0) { 

                    result["muscles"] = muscles[0].muscles;
                    result["musclesTranslation"] = translationArray[0].muscles;
                } else {
                    result["muscles"] = muscles[0].muscles;
                    result["musclesTranslation"] = muscles[0].muscles;
                }

            } else {
                result["muscles"] = muscles[0].muscles;
                result["musclesTranslation"] = muscles[0].muscles;
            }
    
            res.send(result);
      
        } catch (error) {
          console.log(error);
          res.send({ message: "Error getting muscles array"});
        }
      });

   module.exports = router;