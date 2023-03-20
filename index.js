const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mainRouter = require("./routes");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

dotenv.config();

const uri = process.env.MONGODB_URI;

const corsOptions = {
  origin: `https://lifeinvaderapi-production.up.railway.app/`,
};

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGODB_NAME,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Successful connection.");
});

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(mainRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
