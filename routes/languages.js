const router = require("express").Router();
const verify = require("./verifyToken");
const Language = require("../model/Language");
  
  router.post("/:id", verify, async (req, res) => {
      try {
          const newLanguage = new Language({
              name: req.body.name,
              code: req.body.code
          });
  
          const savedLanguage = await newLanguage.save();
  
          res.send({ message: "New language saved successfully"});
    
      } catch (error) {
        console.log(error);
        res.send({ message: "Error saving language"});
      }
    });

    router.put("/:id", verify, async (req, res) => {
        try {
            
            const languages = await Language.find({});

            var result = [];
    
            for (i in languages) {
                const languageOBJ = {
                    name: languages[i].name,
                    code: languages[i].code
                }

                result.push(languageOBJ);
            }

            res.send(result);
      
        } catch (error) {
          console.log(error);
          res.send({ message: "Error getting languages"});
        }
      });
  
  module.exports = router;