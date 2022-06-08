const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const clientsRoute = require("./routes/clients");
const lifestyleRoute = require("./routes/lifestyle");
const measurementsRoute = require("./routes/measurements");
const skinfoldsRoute = require("./routes/skinfolds");

dotenv.config();

const PORT = process.env.PORT || 3000;

//connect to db
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true},() => console.log("connected to db"));

app.use(express.json());

app.use("/api/user",authRoute);
app.use("/api/user/clients",clientsRoute);
app.use("/api/user/clients/info/lifestyle",lifestyleRoute);
app.use("/api/user/clients/measurements",measurementsRoute);
app.use("/api/user/clients/skinfolds",skinfoldsRoute);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
