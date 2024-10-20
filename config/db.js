//db.js
const mongoose = require("mongoose");
require("dotenv").config();

//get mongo URL from .env file
const mongoURL = process.env.MONGO_URL || 'mongodb+srv://somugowdawork:Somugowda67@cluster0.yviay.mongodb.net/studentdb';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
}

module.exports = connectDB;