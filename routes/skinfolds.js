const router = require("express").Router();
const Client = require("../model/Client");
const User = require("../model/User");
const Skinfold = require("../model/SkinfoldsModel");
const verify = require("./verifyToken");

router.post("/add/:id", verify, async (req, res) => {
  try {
    const clientDB = await Client.findOne({
      name: req.body.name,
      surname: req.body.surname,
      phoneNumber: req.body.phoneNumber,
    });

    const skinfold = new Skinfold({
      client: clientDB._id,
      tricep: req.body.newSkinfold.tricep,
      abdominal: req.body.newSkinfold.abdominal,
      suprailiac: req.body.newSkinfold.suprailiac,
      subscapula: req.body.newSkinfold.subscapula,
      midaxillary: req.body.newSkinfold.midaxillary,
      pectoral: req.body.newSkinfold.pectoral,
      thigh: req.body.newSkinfold.thigh,
      date: req.body.newSkinfold.date,
    });

    const savedSkinfold = skinfold.save();

    res.send({ message: "Skinfold added succesfully" });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Unable to add skinfold" });
  }
});

router.put("/info/:id", verify, async (req, res) => {
  try {
    const clientDB = await Client.findOne({
      name: req.body.name,
      surname: req.body.surname,
      phoneNumber: req.body.phoneNumber,
    });
    const skinfoldsDB = await Skinfold.find({ client: clientDB._id });

    const result = [];

    for (i in skinfoldsDB) {
      const skinfoldResult = {
        date: skinfoldsDB[i].date,
      };
      result.push(skinfoldResult);
    }
    res.send(result);
  } catch {
    res.send({ message: "Skinfold not found" });
  }
});

router.put("/data/:id", verify, async (req, res) => {
  try {
    const clientDB = await Client.findOne({
      name: req.body.name,
      surname: req.body.surname,
      phoneNumber: req.body.phoneNumber,
    });
    const skinfoldsDB = await Skinfold.findOne({
      client: clientDB._id,
      date: req.body.date,
    });

    const result = {
      tricep: skinfoldsDB.tricep,
      abdominal: skinfoldsDB.abdominal,
      suprailiac: skinfoldsDB.suprailiac,
      subscapula: skinfoldsDB.subscapula,
      midaxillary: skinfoldsDB.midaxillary,
      pectoral: skinfoldsDB.pectoral,
      thigh: skinfoldsDB.thigh,
      date: skinfoldsDB.date,
    };

    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Unable to get skinfold" });
  }
});

router.put("/data/graph/:id", verify, async (req, res) => {
  try {
    const clientDB = await Client.findOne({
      name: req.body.name,
      surname: req.body.surname,
      phoneNumber: req.body.phoneNumber,
    });
    const skinfoldsDB = await Skinfold.find({ client: clientDB._id });

    const result = {};

    for (i in skinfoldsDB) {
      switch (req.body.bodyPart) {
        case "tricep":
          result[skinfoldsDB[i].date] = skinfoldsDB[i].tricep;
          break;
        case "abdominal":
          result[skinfoldsDB[i].date] = skinfoldsDB[i].abdominal;
          break;
        case "suprailiac":
          result[skinfoldsDB[i].date] = skinfoldsDB[i].suprailiac;
          break;
        case "subscapula":
          result[skinfoldsDB[i].date] = skinfoldsDB[i].subscapula;
          break;
        case "midaxillary":
          result[skinfoldsDB[i].date] = skinfoldsDB[i].midaxillary;
          break;
        case "pectoral":
          result[skinfoldsDB[i].date] = skinfoldsDB[i].pectoral;
          break;
        case "thigh":
          result[skinfoldsDB[i].date] = skinfoldsDB[i].thigh;
          break;
      }
    }

    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Unable to get skinfold data" });
  }
});

module.exports = router;
