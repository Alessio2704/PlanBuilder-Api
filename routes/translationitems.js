const router = require("express").Router();
const verify = require("./verifyToken");
const TranslationItems = require("../model/TranslationItems");
  
  router.post("/:id", verify, async (req, res) => {
      try {
          const newTranslationItems = new TranslationItems({
              name: req.body.name,
              values: req.body.values,
              translation: req.body.translation
          });
  
          const savedTranslationItems= await newTranslationItems.save();
  
          res.send({ message: "New translations array saved successfully"});
    
      } catch (error) {
        console.log(error);
        res.send({ message: "Error saving translations array"});
      }
    });

   module.exports = router;