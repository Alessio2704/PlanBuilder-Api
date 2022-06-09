require("dotenv").config()
const router = require("express").Router();
const verify = require("./verifyToken");
const Client = require("../model/Client");
const Image = require("../model/Image");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { removeImages } = require("../removeImages");
const { uploadFiles } = require("../s3");

router.post("/add/:id", verify, upload.array("image"), async (req, res) => {
    const results = await uploadFiles(req.files);

    const client = await Client.findOne({
        name: req.body.name,
        surname: req.body.surname,
        phoneNumber: req.body.phoneNumber,
    });

    const responseArray = []

    const asyncRes = await Promise.all(results.map( async (result) => {

        const image = new Image({
            imageURL: result.Location,
            imageKey: result.key,
            bodyPart: req.body.bodyPart,
            date: new Date().toISOString(),
            client: client._id
        });
    
        const savedImage = await image.save();
    
            const imageResultDB = {
                imageURL: savedImage.imageURL,
                date: savedImage.date,
            }
    
            responseArray.push(imageResultDB);
    
        }));

    removeImages('./uploads');

    res.send({"message":"Picture Saved"});
});

module.exports = router;
