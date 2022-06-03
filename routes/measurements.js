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
            console.log(result);
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


            console.log(client);

            const measurement = client.measurements.filter(function (measurementDB) {
                return measurementDB.date === req.body.date;
            }).pop();


            console.log(measurement);
            console.log(measurement.weight);

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
