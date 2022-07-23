const router = require("express").Router();
const verify = require("./verifyToken");
const TranslationItems = require("../model/TranslationItems");
  
  router.post("/bodyparts/:id", verify, async (req, res) => {
      try {
          const newTranslationItems = new TranslationItems({
              name: "bodyparts",
              values: req.body.values,
              translation: req.body.translation
          });
  
          const savedTranslationItems= await newTranslationItems.save();
  
          res.send({ message: "New body parts array saved successfully"});
    
      } catch (error) {
        console.log(error);
        res.send({ message: "Error saving body parts array"});
      }
    });

    router.post("/skinfolds/:id", verify, async (req, res) => {
        try {
            const newTranslationItems = new TranslationItems({
                name: "skinfolds",
                values: req.body.values,
                translation: req.body.translation
            });
    
            const savedTranslationItems= await newTranslationItems.save();
    
            res.send({ message: "New skinfolds array saved successfully"});
      
        } catch (error) {
          console.log(error);
          res.send({ message: "Error saving skinfolds array"});
        }
      });

      router.post("/muscles/:id", verify, async (req, res) => {
        try {
            const newTranslationItems = new TranslationItems({
                name: "muscles",
                values: req.body.values,
                translation: req.body.translation
            });
    
            const savedTranslationItems= await newTranslationItems.save();
    
            res.send({ message: "New muscles array saved successfully"});
      
        } catch (error) {
          console.log(error);
          res.send({ message: "Error saving muscles array"});
        }
      });

      router.post("/blockphases/:id", verify, async (req, res) => {
        try {
            const newTranslationItems = new TranslationItems({
                name: "blockphases",
                values: req.body.values,
                translation: req.body.translation
            });
    
            const savedTranslationItems= await newTranslationItems.save();
    
            res.send({ message: "New blockphases array saved successfully"});
      
        } catch (error) {
          console.log(error);
          res.send({ message: "Error saving blockphases array"});
        }
      });

   module.exports = router;