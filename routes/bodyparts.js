const router = require("express").Router();
const verify = require("./verifyToken");
const TranslationItems = require("../model/TranslationItems");

    router.get("/", async (req, res) => {

        try {
            const bodyParts = await TranslationItems.find({name: "bodyparts"});
    
            const languageCode = req.query.language;

            result = [];

            if (languageCode != "EN") {

                const translationArray = bodyParts[0].translation.filter( (el) => {
                    return el.code === languageCode
                });

                if (translationArray.length > 0) { 

                    for (i in translationArray[0].values) {

                        const item = {
                            nameIdentifier: bodyParts[0].values[i],
                            name: translationArray[0].values[i]
                        }

                        result.push(item);
                    }

                } else {

                    for (i in bodyParts[0].values) {

                        const item = {
                            nameIdentifier: bodyParts[0].values[i],
                            name: bodyParts[0].values[i]
                        }

                        result.push(item);
                    }
                }

            } else {
                for (i in bodyParts[0].values) {

                    const item = {
                        nameIdentifier: bodyParts[0].values[i],
                        name: bodyParts[0].values[i]
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
