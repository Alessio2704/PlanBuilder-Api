const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");
const verify = require("./verifyToken");


router.post("/register", async (req,res) => {

    // Validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({"message":error.details[0].message});

    // Check if already in database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send({"message":"Email was already used"});
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    
    try {
        const savedUser = await user.save();
        // Create token
        const token = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET);
        res.send({userID:savedUser._id, token:token});
    }catch(err) {
        res.status(400).send({"message":err});
    }
});

router.post("/login", async (req,res) => {

    // Validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({"message":error.details[0].message});

    // Check if email exists in database
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send({"message":"Email or password is wrong"});

    // Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send({"message":"Invalid Password"});

    // Create token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({userID: user._id,"token":token, "name": user.name});
});

router.delete("/delete/:id", verify, async (req,res) => {
    try {
        const userDB = await User.findByIdAndDelete(req.params.id);
        res.status(200).send({"message":"User deleted"})
    } catch(error) {
        res.status(400).send({"message":"User not found"});
    }
});


module.exports = router;
