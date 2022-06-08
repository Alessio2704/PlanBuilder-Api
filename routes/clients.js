const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");
const Client = require("../model/Client");

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

    } catch(error) {
       res.send({"message":error});
    }
});

module.exports = router;