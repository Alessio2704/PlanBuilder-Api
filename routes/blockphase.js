const router = require("express").Router();
const verify = require("./verifyToken");
const BlockPhase = require("../model/BlockPhase");
  
  router.post("/:id", verify, async (req, res) => {
      try {
          const newBlockPhase = new BlockPhase({
              name: req.body.name,
              translation: req.body.translation
          });
  
          const savedBlockPhase = await newBlockPhase.save();
  
          res.send({ message: "New block phase saved successfully"});
    
      } catch (error) {
        console.log(error);
        res.send({ message: "Error saving blockphase"});
      }
    });

    router.get("/", async (req, res) => {
        try {
            const blockPhases = await BlockPhase.find({});
            const languageCode = req.query.language;

            var result = [];

            for (i in blockPhases) { 

                var name = "";

                if (languageCode != "EN") {
                 const translationArray = blockPhases[i].translation.filter(function (el) {
                    return el.code === languageCode;
                  });
      
                  if (translationArray.length > 0) {
                    name = translationArray[0].translation;
                  } else {
                    name = blockPhases[i].name
                  }
                } else {
                  name = blockPhases[i].name
                }
    
                const phaseOBJ = {
                  nameIdentifier: blockPhases[i].name,
                  name: name
                }
    
                result.push(phaseOBJ);
            }
    
            res.send(result);
      
        } catch (error) {
          console.log(error);
          res.send({ message: "Error getting blockphases"});
        }
      });

    module.exports = router;