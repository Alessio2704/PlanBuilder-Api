const router = require("express").Router();
const User = require("../model/User");
const { MeasurementsModelSchema, MeasurementsModel} = require("../model/PublicPlan");
const verify = require("./verifyToken");

router.post("/add/:id", verify, (req, res) => {

    const user = User.findOne({_id:req.params.id}, function (err, user) {
        try {
            const client = user.clients.filter(function (client) {
                return client.name === req.body.name && client.surname === req.body.surname && client.phoneNumber === req.body.phoneNumber;
            }).pop();
            
            const newMeasurement = {
                weight: req.body.weight,
                ankleDx: req.body.ankleDx,
                ankleSx: req.body.ankleSx,
                calfDx: req.body.calfDx,
                calfSx: req.body.calfSx,
                upperThighDx: req.body.upperThighDx,
                upperThighSx: req.body.upperThighSx,
                middleThighDx: req.body.middleThighDx,
                middleThighSx: req.body.middleThighSx,
                flanks: req.body.flanks,
                lowerBellyButton: req.body.lowerBellyButton,
                bellyButton: req.body.bellyButton,
                waist: req.body.waist,
                chest: req.req.body.chest,
                neck: req.body.neck,
                armDx: req.body.armDx,
                armSx: req.body.armSx,
                wristDx: req.body.wristDx,
                wristSx: req.body.wristSx,
            };

            client.measurements.push(newMeasurement);

            user.save();

            res.send({"message":"New measurement added succesfully"})

        } catch(err) {
            res.send({"message":"Plan not found"});
        }
    });
});



module.exports = router;
