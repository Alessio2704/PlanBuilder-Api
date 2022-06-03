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


            const measurement = client.measurements.filter(function (measurementDB) {
                return measurementDB.date === req.body.date;
            }).pop();


            console.log(measurement[0]);
            console.log(measurement[0].weight);

            const result = {
                weight: measurement[0].weight,
                ankleDx: measurement[0].ankleDx,
                ankleSx: measurement[0].ankleSx,
                calfDx: measurement[0].calfDx,
                calfSx: measurement[0].calfSx,
                upperThighDx: measurement[0].upperThighDx,
                upperThighSx: measurement[0].upperThighSx,
                middleThighDx: measurement[0].middleThighDx,
                middleThighSx: measurement[0].middleThighSx,
                flanks: measurement[0].flanks,
                lowerBellyButton: measurement[0].lowerBellyButton,
                bellyButton: measurement[0].bellyButton,
                waist: measurement[0].waist,
                chest: measurement[0].chest,
                shoulders: measurement[0].shoulders,
                neck: measurement[0].neck,
                armDx: measurement[0].armDx,
                armSx: measurement[0].armSx,
                wristDx: measurement[0].wristDx,
                wristSx: measurement[0].wristSx,
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
