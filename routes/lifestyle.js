const router = require("express").Router();
const verify = require("./verifyToken");
const Client = require("../model/Client");
const Lifestyle = require("../model/Lifestyle");


router.post("/detail/:id", verify, async (req, res) => {
    try {
        const client = await Client.findOne({
            name: req.body.name,
            surname: req.body.surname,
            phoneNumber: req.body.phoneNumber,
          });

        const deletion = await Lifestyle.deleteMany({client : client._id } );


        const lifestyle = new Lifestyle({
            steps: req.body.steps,
            work: req.body.work,
            sleep: req.body.sleep,
            alcohol: req.body.alcohol,
            smoke: req.body.smoke,
            diet: req.body.diet,
            client: client._id
        });

        const savedlifestyle = await lifestyle.save();

        const result = {
            steps: savedlifestyle.steps,
            work: savedlifestyle.work,
            sleep: savedlifestyle.sleep,
            smoke: savedlifestyle.smoke,
            alcohol: savedlifestyle.alcohol,
            diet: savedlifestyle.diet,
        }

        res.send(result);

    } catch(error) {
       res.send({"message":error});
    }
});

router.put("/detail/:id", verify, async (req, res) => {
    try {
        const client = await Client.findOne({
            name: req.body.name,
            surname: req.body.surname,
            phoneNumber: req.body.phoneNumber,
          });

          const lifestyle = await Lifestyle.findOne({
            client: client._id
          });

          res.send({
            steps: lifestyle.steps,
            work: lifestyle.work,
            sleep: lifestyle.sleep,
            smoke: lifestyle.smoke,
            alcohol: lifestyle.alcohol,
            diet: lifestyle.diet,
          });

    } catch(error) {
       res.send({"message":error});
    }
});

module.exports = router;