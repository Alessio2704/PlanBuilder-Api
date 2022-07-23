const router = require("express").Router();
const verify = require("./verifyToken");
const TranslationItems = require("../model/TranslationItems");

router.get("/", async (req, res) => {
        
  try {
      const blockPhases = await TranslationItems.find({name: "blockphases"});

      const languageCode = req.query.language;

      result = [];

      if (languageCode != "EN") {

          const translationArray = blockPhases[0].translation.filter( (el) => {
              return el.code === languageCode
          });

          if (translationArray.length > 0) { 

              for (i in translationArray[0].values) {

                  const item = {
                      nameIdentifier: blockPhases[0].values[i],
                      name: translationArray[0].values[i]
                  }

                  result.push(item);
              }

          } else {

              for (i in blockPhases[0].values) {

                  const item = {
                      nameIdentifier: blockPhases[0].values[i],
                      name: blockPhases[0].values[i]
                  }

                  result.push(item);
              }
          }

      } else {
          for (i in blockPhases[0].values) {

              const item = {
                  nameIdentifier: blockPhases[0].values[i],
                  name: blockPhases[0].values[i]
              }

              result.push(item);
          }
      }

      res.send(result);

  } catch (error) {
    console.log(error);
    res.send({ message: "Error getting blockphases array"});
  }
});

    module.exports = router;