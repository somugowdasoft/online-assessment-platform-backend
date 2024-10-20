const express = require("express");
//import DB
const connectDB = require("./config/db");

//body parser
const bodyParser = require("body-parser");

//env config
require("dotenv").config();

connectDB();

const app = express();

//parsing incoming JSON request
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
})