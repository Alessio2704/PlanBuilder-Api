require("dotenv").config();
const router = require("express").Router();
const verify = require("./verifyToken");
const Client = require("../model/Client");
const Image = require("../model/Image");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { removeImages } = require("../removeImages");
const { uploadFiles } = require("../s3");

router.post("/add/:id", verify, upload.array("image"), async (req, res) => {
  try {
    const results = await uploadFiles(req.files);

    const client = await Client.findOne({
      name: req.body.name,
      surname: req.body.surname,
      phoneNumber: req.body.phoneNumber,
    });

    const responseArray = [];

    const asyncRes = await Promise.all(
      results.map(async (result) => {
        const image = new Image({
          imageURL: result.Location,
          imageKey: result.key,
          bodyPart: req.body.bodyPart,
          date: new Date().toISOString(),
          client: client._id,
        });

        const savedImage = await image.save();

        const imageResultDB = {
          imageURL: savedImage.imageURL,
          date: savedImage.date,
        };

        responseArray.push(imageResultDB);
      })
    );

    removeImages("./uploads");

    res.send({ message: "Picture Saved" });
  } catch (error) {
    res.send({ message: "Error saving image" });
  }
});

router.put("/info/:id", verify, async (req, res) => {

    try {
      const clientDB = await Client.findOne({
        name: req.body.name,
        surname: req.body.surname,
        phoneNumber: req.body.phoneNumber,
      });

      const imagesDB = await Image.find({ client: clientDB._id });
  
      const result = [];
      const resultSet = new Set();
  
      for (j in imagesDB) {
        resultSet.add(imagesDB[j].date.substring(0,10));
      }

      for (let item of resultSet) {
        const imageResult = {
          date: item
        };

        result.push(imageResult);
      }

      res.send(result);

    } catch {
      res.send({ message: "Images not found" });
    }
  });

module.exports = router;
