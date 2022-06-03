const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const clientsRoute = require("./routes/clients");
const measurementsRoute = require("./routes/measurements");

dotenv.config();

const PORT = process.env.PORT || 3000;

//connect to db
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true},() => console.log("connected to db"));

app.use(express.json());

app.use("/api/user",authRoute);
app.use("/api/user/clients",clientsRoute);
app.use("/api/user/clients/measurements",measurementsRoute);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
