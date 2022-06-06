const router = require("express").Router();
const User = require("../model/User");
const verify = require("./verifyToken");

router.post("/add/:id", verify, (req, res) => {

    const user = User.findOne({_id:req.params.id}, function (err, user) {
        try {
            const client = user.clients.filter(function (clientDB) {
                return clientDB.name === req.body.name && clientDB.surname === req.body.surname && clientDB.phoneNumber === req.body.phoneNumber;
            }).pop();
            
            client.skinfolds.push(req.body.newSkinfold);
            user.save();

            res.send({"message":"New skinfold added succesfully"})

        } catch(err) {
            console.log(err)
            res.status(404).send({"message":"Unable to add skinfold"});
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

            for (i in client.skinfolds) {

                const skinfoldResult = {
                    "date": client.skinfolds[i].date
                }
                result.push(skinfoldResult);
            }
            res.send(result);

        } catch(err) {
            console.log(err)
            res.status(404).send({"message":"Unable to get skinfold"});
        }
    });
});

router.put("/data/:id", verify, (req, res) => {

    const user = User.findOne({_id:req.params.id}, function (err, user) {
        try {
            const client = user.clients.filter(function (clientDB) {
                return clientDB.name === req.body.name && clientDB.surname === req.body.surname && clientDB.phoneNumber === req.body.phoneNumber;
            }).pop();
            
            const skinfold = client.skinfolds.filter(function (skinfoldDB) {
                return skinfoldDB.date === req.body.date;
            }).pop();

            const result = {
                tricep: skinfold.tricep,
                abdominal: skinfold.abdominal,
                suprailiac: skinfold.suprailiac,
                subscapula: skinfold.subscapula,
                midaxillary: skinfold.midaxillary,
                pectoral: skinfold.pectoral,
                thigh: skinfold.thigh,
                date: skinfold.date,
            }

            res.send(result);

        } catch(err) {
            console.log(err)
            res.status(404).send({"message":"Unable to get skinfold"});
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

            for (i in client.skinfolds) {

                switch (req.body.bodyPart) {

                    case "tricep":
                        result[client.skinfolds[i].date] = client.skinfolds[i].tricep
                        break;
                    case "abdominal":
                        result[client.skinfolds[i].date] = client.skinfolds[i].abdominal
                        break;
                    case "suprailiac":
                        result[client.skinfolds[i].date] = client.skinfolds[i].suprailiac;
                        break;
                    case "subscapula":
                        result[client.skinfolds[i].date] = client.skinfolds[i].subscapula;
                        break;
                    case "midaxillary":
                        result[client.skinfolds[i].date] = client.skinfolds[i].midaxillary;
                        break;
                    case "pectoral":
                        result[client.skinfolds[i].date] = client.skinfolds[i].pectoral;
                        break;
                    case "thigh":
                        result[client.skinfolds[i].date] = client.skinfolds[i].thigh;
                        break;
                  }
            }

            res.send(result);

        } catch(err) {
            console.log(err)
            res.status(404).send({"message":"Unable to get skinfold"});
        }
    });
});



module.exports = router;
