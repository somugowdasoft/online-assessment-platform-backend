//db.js
const mongoose = require("mongoose");
require("dotenv").config();

//get mongo URL from .env file
const mongoURL = process.env.MONGO_URL

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            serverSelectionTimeoutMS: 5000,
        }).then(() => console.log('MongoDB connected'))
            .catch(err => {
                console.error('MongoDB connection error:', err);
                process.exit(1); // Exit the process if the database connection fails
            });
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
}

module.exports = connectDB;