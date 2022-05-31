const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

router.get("/info/:id", verify, async (req, res) => {
    try {
        const userDB = await User.findOne({ _id: req.params.id });
        
        const result = []

        for (i in userDB.clients) {

            const clientResult = {
                "name":userDB.clients[i].name,
                "surname":userDB.clients[i].surname,
                "email":userDB.clients[i].email,
                "age":userDB.clients[i].age,
                "phoneNumber":userDB.clients[i].phoneNumber,
            }

            result.push(clientResult);
        }

        res.send(result);

    } catch(error) {
       res.send({"message":"No personal plans found"});
    }
});

router.put("/info/:id", verify, async (req, res) => {
    try {
        const user = await User.updateOne({_id:req.params.id},{$push: {clients: req.body}});
        res.send({"message": "ok"});
    } catch(error) {
       res.send({"message":"Error"});
    }
});

module.exports = router;