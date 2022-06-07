const router = require("express").Router();
const Client = require("../model/Client");
const User = require("../model/User");
const Measurement = require("../model/MeasurementsModel");
const verify = require("./verifyToken");

router.post("/add/:id", verify, async (req, res) => {

  const clientDB = await Client.findOne({
    name: req.body.name,
    surname: req.body.surname,
    phoneNumber: req.body.phoneNumber,
  });

  const measurement = new Measurement({
    client: clientDB._id,
    weight: req.body.newMeasurement.weight,
    ankleDx: req.body.newMeasurement.ankleDx,
    ankleSx: req.body.newMeasurement.ankleSx,
    calfDx: req.body.newMeasurement.calfDx,
    calfSx: req.body.newMeasurement.calfSx,
    upperThighDx: req.body.newMeasurement.upperThighDx,
    upperThighSx: req.body.newMeasurement.upperThighSx,
    middleThighDx: req.body.newMeasurement.middleThighDx,
    middleThighSx: req.body.newMeasurement.middleThighSx,
    flanks: req.body.newMeasurement.flanks,
    lowerBellyButton: req.body.newMeasurement.lowerBellyButton,
    bellyButton: req.body.newMeasurement.bellyButton,
    waist: req.body.newMeasurement.waist,
    chest: req.body.newMeasurement.chest,
    shoulders: req.body.newMeasurement.shoulders,
    neck: req.body.newMeasurement.neck,
    armDx: req.body.newMeasurement.armDx,
    armSx: req.body.newMeasurement.armSx,
    wristDx: req.body.newMeasurement.wristDx,
    wristSx: req.body.newMeasurement.wristSx,
    date: req.body.newMeasurement.date,
  });

  const savedMeasurement = measurement.save();

  res.send({ message: "Measurement added succesfully" });
});

router.put("/info/:id", verify, async (req, res) => {

  try {
    const clientDB = await Client.findOne({
      name: req.body.name,
      surname: req.body.surname,
      phoneNumber: req.body.phoneNumber,
    });
    const measurementsDB = await Measurement.find({ client: clientDB._id });

    const result = [];

    for (i in measurementsDB) {
      const measurementResult = {
        date: measurementsDB[i].date,
      };
      result.push(measurementResult);
    }
    res.send(result);
  } catch {
    res.send({ message: "Measurement not found" });
  }
});

router.put("/data/:id", verify, async (req, res) => {

  try {
    const clientDB = await Client.findOne({
      name: req.body.name,
      surname: req.body.surname,
      phoneNumber: req.body.phoneNumber,
    });
    const measurementsDB = await Measurement.findOne({
      client: clientDB._id,
      date: req.body.date,
    });

    const result = {
      weight: measurementsDB.weight,
      ankleDx: measurementsDB.ankleDx,
      ankleSx: measurementsDB.ankleSx,
      calfDx: measurementsDB.calfDx,
      calfSx: measurementsDB.calfSx,
      upperThighDx: measurementsDB.upperThighDx,
      upperThighSx: measurementsDB.upperThighSx,
      middleThighDx: measurementsDB.middleThighDx,
      middleThighSx: measurementsDB.middleThighSx,
      flanks: measurementsDB.flanks,
      lowerBellyButton: measurementsDB.lowerBellyButton,
      bellyButton: measurementsDB.bellyButton,
      waist: measurementsDB.waist,
      chest: measurementsDB.chest,
      shoulders: measurementsDB.shoulders,
      neck: measurementsDB.neck,
      armDx: measurementsDB.armDx,
      armSx: measurementsDB.armSx,
      wristDx: measurementsDB.wristDx,
      wristSx: measurementsDB.wristSx,
      date: measurementsDB.date,
    };
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Unable to get measurement" });
  }
});

router.put("/data/graph/:id", verify, async (req, res) => {

  try {
    const clientDB = await Client.findOne({
      name: req.body.name,
      surname: req.body.surname,
      phoneNumber: req.body.phoneNumber,
    });
    const measurementsDB = await Measurement.find({ client: clientDB._id });

    const result = {};

    for (i in measurementsDB) {
      switch (req.body.bodyPart) {
        case "weight":
          result[measurementsDB[i].date] = measurementsDB[i].weight;
          break;
        case "ankleDx":
          result[measurementsDB[i].date] = measurementsDB[i].ankleDx;
          break;
        case "ankleSx":
          result[measurementsDB[i].date] = measurementsDB[i].ankleSx;
          break;
        case "calfDx":
          result[measurementsDB[i].date] = measurementsDB[i].calfDx;
          break;
        case "calfSx":
          result[measurementsDB[i].date] = measurementsDB[i].calfSx;
          break;
        case "upperThighDx":
          result[measurementsDB[i].date] = measurementsDB[i].upperThighDx;
          break;
        case "upperThighSx":
          result[measurementsDB[i].date] = measurementsDB[i].upperThighSx;
          break;
        case "middleThighDx":
          result[measurementsDB[i].date] = measurementsDB[i].middleThighDx;
          break;
        case "middleThighSx":
          result[measurementsDB[i].date] = measurementsDB[i].middleThighSx;
          break;
        case "flanks":
          result[measurementsDB[i].date] = measurementsDB[i].flanks;
          break;
        case "lowerBellyButton":
          result[measurementsDB[i].date] = measurementsDB[i].lowerBellyButton;
          break;
        case "bellyButton":
          result[measurementsDB[i].date] = measurementsDB[i].bellyButton;
          break;
        case "waist":
          result[measurementsDB[i].date] = measurementsDB[i].waist;
          break;
        case "chest":
          result[measurementsDB[i].date] = measurementsDB[i].chest;
          break;
        case "shoulders":
          result[measurementsDB[i].date] = measurementsDB[i].shoulders;
          break;
        case "neck":
          result[measurementsDB[i].date] = measurementsDB[i].neck;
          break;
        case "armDx":
          result[measurementsDB[i].date] = measurementsDB[i].armDx;
          break;
        case "armSx":
          result[measurementsDB[i].date] = measurementsDB[i].armSx;
          break;
        case "wristDx":
          result[measurementsDB[i].date] = measurementsDB[i].wristDx;
          break;
        case "wristSx":
          result[measurementsDB[i].date] = measurementsDB[i].wristSx;
          break;
      }
    }

    res.send(result);

  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Unable to get measurement data" });
  }
});

module.exports = router;
