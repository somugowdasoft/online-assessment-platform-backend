const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number, // in minutes
        required: true,
    },
    level: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
    totalMarks: {
        type: Number,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
