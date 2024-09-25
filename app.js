const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const router = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;
const { errors } = require("celebrate");
const { errorHandling } = require("./middlewares/errorHandling");
const { requestLogger, errorLogger } = require("./middlewares/logger");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.use("/", router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandling);

app.listen(PORT);
