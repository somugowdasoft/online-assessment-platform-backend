const mongoose = require('mongoose');

const ProctorSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    screenshot: {
        type: String,
        required: true
    },
    tabFocused: {
        type: Boolean,
        required: true
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam', // Assuming you have an Exam model
        required: true
    },
    exam: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    }
});

const Proctor = mongoose.model('Proctor', ProctorSchema);

module.exports = Proctor;
