require("dotenv").config();
const router = require("express").Router();
const verify = require("./verifyToken");
const Client = require("../model/Client");
const Measurement = require("../model/MeasurementsModel");
const Skinfold = require("../model/SkinfoldsModel");
const Lifestyle = require("../model/Lifestyle");
const Image = require("../model/Image");

const { deleteFile } = require("../s3");

router.post("/info/:id", verify, async (req, res) => {
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

router.delete("/info/:id", verify, async (req, res) => {
    try {
        const client = await Client.findOneAndDelete({
            name: req.body.name,
            surname: req.body.surname,
            phoneNumber: req.body.phoneNumber,
          });

          const measurement = await Measurement.deleteMany({
            client: client._id
          });

          const skinfold = await Skinfold.deleteMany({
            client: client._id
          });

          const lifestyle = await Lifestyle.findOneAndDelete({
            client: client._id
          });

          const images = await Image.find({
            client: client._id
          });
          
          const imagesDeleted = await Image.deleteMany({
            client: client._id
          });

          for (i in images) {
            const deletionResult = await deleteFile(images[i].imageKey);
          }

          res.send({"message":"Client deleted"});

    } catch(error) {
        console.log(error)
        res.send({"message":error});
    }
});

module.exports = router;