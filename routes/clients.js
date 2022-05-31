const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

router.put("/info/:id", verify, async (req, res) => {
    try {
        const user = await User.updateOne({_id:req.params.id},{$push: {clients: req.body}});
        res.send({"message": "ok"});
    } catch(error) {
       res.send({"message":"Error"});
    }
});


module.exports = router;