require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

// applying routes


// spinning up the server
app.listen(process.env.PORT || 5000, () => {
    console.log(`App is running on port: ${process.env.PORT || 5000}`)
})