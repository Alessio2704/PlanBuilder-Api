const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const multer = require("multer");
const authRoute = require("./routes/auth");
const clientsRoute = require("./routes/clients");
const lifestyleRoute = require("./routes/lifestyle");
const measurementsRoute = require("./routes/measurements");
const skinfoldsRoute = require("./routes/skinfolds");
const imagesRoute = require("./routes/images");
const  exercisesRoute = require("./routes/exercises");
const  movementPatternsRoute = require("./routes/movementPatterns");
const languagesRoute = require("./routes/languages");
const blockPhaseRoute = require("./routes/blockphase");
const musclesRoute = require("./routes/muscles");
const bodyPartsRoute = require("./routes/bodyparts");
const skinfoldPartsRoute = require("./routes/skinfoldparts");
const setTypesRoute = require("./routes/settypes");
const translationItemsRoute = require("./routes/translationitems");

dotenv.config();

const PORT = process.env.PORT || 3000;

//connect to db
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true},() => console.log("connected to db"));

const testFolder = "uploads/";
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
    console.log("Files in uploads directory:")
  files.forEach(file => {
    console.log(file);
  });
});

app.use(express.json());

app.use("/api/user",authRoute);
app.use("/api/user/clients",clientsRoute);
app.use("/api/user/clients/info/lifestyle",lifestyleRoute);
app.use("/api/user/clients/measurements",measurementsRoute);
app.use("/api/user/clients/skinfolds",skinfoldsRoute);
app.use("/api/user/clients/images",imagesRoute);
app.use("/api/exercises",exercisesRoute);
app.use("/api/movementpatterns",movementPatternsRoute);
app.use("/api/supportedLanguages",languagesRoute);
app.use("/api/blockphase",blockPhaseRoute);
app.use("/api/muscles",musclesRoute);
app.use("/api/bodyparts",bodyPartsRoute);
app.use("/api/skinfoldparts",skinfoldPartsRoute);
app.use("/api/settypes",setTypesRoute);
app.use("/api/translationitems",translationItemsRoute);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
