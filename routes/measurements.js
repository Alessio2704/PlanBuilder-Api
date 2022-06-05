const router = require("express").Router();
const User = require("../model/User");
const verify = require("./verifyToken");

router.post("/add/:id", verify, (req, res) => {

    const user = User.findOne({_id:req.params.id}, function (err, user) {
        try {
            const client = user.clients.filter(function (clientDB) {
                return clientDB.name === req.body.name && clientDB.surname === req.body.surname && clientDB.phoneNumber === req.body.phoneNumber;
            }).pop();
            
            client.measurements.push(req.body.newMeasurement);
            user.save();

            res.send({"message":"New measurement added succesfully"})

        } catch(err) {
            console.log(err)
            res.status(404).send({"message":"Unable to add measurement"});
        }
    });
});

router.put("/info/:id", verify, (req, res) => {

    const user = User.findOne({_id:req.params.id}, function (err, user) {
        try {
            const client = user.clients.filter(function (clientDB) {
                return clientDB.name === req.body.name && clientDB.surname === req.body.surname && clientDB.phoneNumber === req.body.phoneNumber;
            }).pop();
            
            const result = [];

            for (i in client.measurements) {

                const measurementResult = {
                    "date": client.measurements[i].date
                }
                result.push(measurementResult);
            }
            res.send(result);

        } catch(err) {
            console.log(err)
            res.status(404).send({"message":"Unable to get measurement"});
        }
    });
});

router.put("/data/:id", verify, (req, res) => {

    const user = User.findOne({_id:req.params.id}, function (err, user) {
        try {
            const client = user.clients.filter(function (clientDB) {
                return clientDB.name === req.body.name && clientDB.surname === req.body.surname && clientDB.phoneNumber === req.body.phoneNumber;
            }).pop();
            
            const measurement = client.measurements.filter(function (measurementDB) {
                return measurementDB.date === req.body.date;
            }).pop();

            const result = {
                weight: measurement.weight,
                ankleDx: measurement.ankleDx,
                ankleSx: measurement.ankleSx,
                calfDx: measurement.calfDx,
                calfSx: measurement.calfSx,
                upperThighDx: measurement.upperThighDx,
                upperThighSx: measurement.upperThighSx,
                middleThighDx: measurement.middleThighDx,
                middleThighSx: measurement.middleThighSx,
                flanks: measurement.flanks,
                lowerBellyButton: measurement.lowerBellyButton,
                bellyButton: measurement.bellyButton,
                waist: measurement.waist,
                chest: measurement.chest,
                shoulders: measurement.shoulders,
                neck: measurement.neck,
                armDx: measurement.armDx,
                armSx: measurement.armSx,
                wristDx: measurement.wristDx,
                wristSx: measurement.wristSx,
                date: measurement.date
            }

            res.send(result);

        } catch(err) {
            console.log(err)
            res.status(404).send({"message":"Unable to get measurement"});
        }
    });
});

router.put("/data/graph/:id", verify, (req, res) => {

    const user = User.findOne({_id:req.params.id}, function (err, user) {
        try {
            const client = user.clients.filter(function (clientDB) {
                return clientDB.name === req.body.name && clientDB.surname === req.body.surname && clientDB.phoneNumber === req.body.phoneNumber;
            }).pop();
            
            const result = {}

            for (i in client.measurements) {

                switch (req.body.bodyPart) {

                    case "weight":
                        result[client.measurements[i].date] = client.measurements[i].weight
                        break;
                    case "ankleDx":
                        result[client.measurements[i].date] = client.measurements[i].ankleDx
                        break;
                    case "ankleSx":
                        result[client.measurements[i].date] = client.measurements[i].ankleSx;
                        break;
                    case "calfDx":
                        result[client.measurements[i].date] = client.measurements[i].calfDx;
                        break;
                    case "calfSx":
                        result[client.measurements[i].date] = client.measurements[i].calfSx;
                        break;
                    case "upperThighDx":
                        result[client.measurements[i].date] = client.measurements[i].upperThighDx;
                        break;
                    case "upperThighSx":
                        result[client.measurements[i].date] = client.measurements[i].upperThighSx;
                        break;
                    case "middleThighDx":
                        result[client.measurements[i].date] = client.measurements[i].middleThighDx;
                        break;
                    case "middleThighSx":
                        result[client.measurements[i].date] = client.measurements[i].middleThighSx;
                        break;
                    case "flanks":
                        result[client.measurements[i].date] = client.measurements[i].flanks;
                        break;
                    case "lowerBellyButton":
                        result[client.measurements[i].date] = client.measurements[i].lowerBellyButton;
                        break;
                    case "bellyButton":
                        result[client.measurements[i].date] = client.measurements[i].bellyButton;
                        break;
                    case "waist":
                        result[client.measurements[i].date] = client.measurements[i].waist;
                        break;
                    case "chest":
                        result[client.measurements[i].date] = client.measurements[i].chest;
                        break;
                    case "shoulders":
                        result[client.measurements[i].date] = client.measurements[i].shoulders;
                        break;
                    case "neck":
                        result[client.measurements[i].date] = client.measurements[i].neck;
                        break;
                    case "armDx":
                        result[client.measurements[i].date] = client.measurements[i].armDx;
                        break;
                    case "armSx":
                        result[client.measurements[i].date] = client.measurements[i].armSx;
                        break;
                    case "wristDx":
                        result[client.measurements[i].date] = client.measurements[i].wristDx;
                        break;
                    case "wristSx":
                        result[client.measurements[i].date] = client.measurements[i].wristSx;
                        break;

                  }
            }

            console.log(result);
            res.send(result);

        } catch(err) {
            console.log(err)
            res.status(404).send({"message":"Unable to get measurement"});
        }
    });
});



module.exports = router;
