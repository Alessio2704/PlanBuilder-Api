const router = require("express").Router();
const verify = require("./verifyToken");
const BodyParts = require("../model/BodyParts");
  
  router.post("/:id", verify, async (req, res) => {
      try {
          const newBodyParts = new BodyParts({
              bodyParts: req.body.bodyParts,
              translation: req.body.translation
          });
  
          const savedBodyParts= await newBodyParts.save();
  
          res.send({ message: "New body parts array saved successfully"});
    
      } catch (error) {
        console.log(error);
        res.send({ message: "Error saving body parts array"});
      }
    });

    router.get("/", async (req, res) => {
        try {
            const bodyParts = await BodyParts.find({});
    
            const languageCode = req.query.language;

            result = [];

            if (languageCode != "EN") {

                const translationArray = bodyParts[0].translation.filter( (el) => {
                    return el.code === languageCode
                });

                if (translationArray.length > 0) { 

                    for (i in translationArray[0].bodyParts) {

                        const item = {
                            nameIdentifier: bodyParts[0].bodyParts[i],
                            name: translationArray[0].bodyParts[i]
                        }

                        result.push(item);
                    }

                } else {

                    for (i in translationArray[0].bodyParts) {

                        const item = {
                            nameIdentifier: bodyParts[0].bodyParts[i],
                            name: bodyParts[0].bodyParts[i]
                        }

                        result.push(item);
                    }
                }

            } else {
                for (i in translationArray[0].bodyParts) {

                    const item = {
                        nameIdentifier: bodyParts[0].bodyParts[i],
                        name: bodyParts[0].bodyParts[i]
                    }

                    result.push(item);
                }
            }
    
            res.send(result);
      
        } catch (error) {
          console.log(error);
          res.send({ message: "Error getting body parts array"});
        }
      });

   module.exports = router;
