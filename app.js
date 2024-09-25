const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const router = require("./routes");
const { errorHandling } = require("./middlewares/errorHandling");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(cors());

app.use(express.json());

app.use("/", router);

app.use(errorHandling);

app.listen(PORT);
