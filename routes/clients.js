const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");
const Client = require("../model/Client");
const Lifestyle = require("../model/Lifestyle");

router.post("/info/:id", async (req, res) => {
    try {
        const clientsDB = await Client.find({user:req.params.id});

        const result = []

        for (i in clientsDB) {

            const clientResult = {
                "name":clientsDB[i].name,
                "surname":clientsDB[i].surname,
                "gender":clientsDB[i].gender,
                "height":clientsDB[i].height,
                "email":clientsDB[i].email,
                "age":clientsDB[i].age,
                "phoneNumber":clientsDB[i].phoneNumber,
            }

            result.push(clientResult);
        }

        res.send(result);

    } catch(error) {
       res.send({"message":"No client found"});
    }
});

router.put("/info/:id", verify, async (req, res) => {
    try {
        const client = new Client({
            name: req.body.name,
            surname: req.body.surname,
            gender: req.body.gender,
            email: req.body.email,
            age: req.body.age,
            phoneNumber: req.body.phoneNumber,
            height: req.body.height,
            report: "",
            user: req.params.id
        });

        const savedClient = await client.save();

        res.send({"message": "ok"});

    } catch(error) {
       res.send({"message":error});
    }
});

router.post("/info/report/:id", verify, async (req, res) => {
    try {
        const client = await Client.findOne({
            name: req.body.name,
            surname: req.body.surname,
            phoneNumber: req.body.phoneNumber,
          });

          client.report = req.body.report;

          client.save()

          res.send({"message":"Report added"});

    } catch(error) {
       res.send({"message":error});
    }
});

router.put("/info/report/:id", verify, async (req, res) => {
    try {
        const client = await Client.findOne({
            name: req.body.name,
            surname: req.body.surname,
            phoneNumber: req.body.phoneNumber,
          });

          res.send({"report":client.report});

    } catch(error) {
       res.send({"message":error});
    }
});

router.post("/info/detail/:id", verify, async (req, res) => {
    try {
        const client = await Client.findOne({
            name: req.body.name,
            surname: req.body.surname,
            phoneNumber: req.body.phoneNumber,
          });

        const lifestyle = new Lifestyle({
            steps: req.body.steps,
            work: req.body.work,
            sleep: req.body.sleep,
            alcohol: req.body.alcohol,
            smoke: req.body.smoke,
            diet: req.body.diet,
            client: {
                type: mongoose.Schema.Types.ObjectId, ref: "Client"
            }
        });

        lifestyle.save();

        res.send({
            steps: lifestyle.steps,
            work: lifestyle.work,
            sleep: lifestyle.sleep,
            smoke: lifestyle.smoke,
            alcohol: lifestyle.alcohol,
            diet: lifestyle.diet,
        })

    } catch(error) {
       res.send({"message":error});
    }
});

router.put("/info/detail/:id", verify, async (req, res) => {
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