const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const appRoute = require("./Routes/Routes");

const app = express();
const PORT = process.env.PORT || 8080;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    console.log(fileName);
    cb(null, fileName);
  },
});

app.set("view engine", "ejs");
app.use(multer({ storage: fileStorage, limits: 1e8 }).single("file"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(appRoute);

mongoose.connect(
  process.env.MONGOOSE_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    app.listen(PORT, () => {
      console.log("server is up and running at port " + PORT);
    });
  }
);
