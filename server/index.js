require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path")
const homeRoute = require("./routes/index");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "cover")));
app.use("/uploads", express.static("uploads"))
app.use("/cover", express.static("cover"));
// applying routes
app.use("/home", homeRoute);

// spinning up the server
app.listen(process.env.PORT || 5000, () => {
    console.log(`App is running on port: ${process.env.PORT || 5000}`)
})