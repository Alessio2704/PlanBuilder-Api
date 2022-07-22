const router = require("express").Router();
const verify = require("./verifyToken");
const SkinfoldParts = require("../model/SkinfoldParts");
  
  router.post("/:id", verify, async (req, res) => {
      try {
          const newSkinfoldParts = new SkinfoldParts({
              skinfoldParts: req.body.skinfoldParts,
              translation: req.body.translation
          });
  
          const savedSkinfoldParts= await newSkinfoldParts.save();
  
          res.send({ message: "New skinfold parts array saved successfully"});
    
      } catch (error) {
        console.log(error);
        res.send({ message: "Error saving skinfold parts array"});
      }
    });

    router.get("/", async (req, res) => {
        try {
            const skinfoldParts = await SkinfoldParts.find({});
    
            const languageCode = req.query.language;

            result = [];

            if (languageCode != "EN") {

                const translationArray = skinfoldParts[0].translation.filter( (el) => {
                    return el.code === languageCode
                });

                if (translationArray.length > 0) { 

                    for (i in translationArray[0].skinfoldParts) {

                        const item = {
                            nameIdentifier: skinfoldParts[0].skinfoldParts[i],
                            name: translationArray[0].skinfoldParts[i]
                        }

                        result.push(item);
                    }

                } else {

                    for (i in translationArray[0].bodyParts) {

                        const item = {
                            nameIdentifier: skinfoldParts[0].skinfoldParts[i],
                            name: skinfoldParts[0].skinfoldParts[i]
                        }

                        result.push(item);
                    }
                }

            } else {
                for (i in translationArray[0].bodyParts) {

                    const item = {
                        nameIdentifier: skinfoldParts[0].skinfoldParts[i],
                        name: skinfoldParts[0].skinfoldParts[i]
                    }

                    result.push(item);
                }
            }
    
            res.send(result);
      
        } catch (error) {
          console.log(error);
          res.send({ message: "Error getting skinfold parts array"});
        }
      });

   module.exports = router;
