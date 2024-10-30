const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    questionType: {
        type: String,
        enum: ['multiple-choice', 'true-false', 'short-answer'], // Define allowed types
        required: true,
    },
    options: {
        type: [String], // Only required for multiple-choice
        validate: {
            validator: function (options) {
                // Options are only required for multiple-choice questions
                return this.questionType !== 'multiple-choice' || (options && options.length >= 2);
            },
            message: 'Multiple-choice questions must have at least two options.',
        },
    },
    
    correctAnswer: {
        type: String,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    },
    exam: {
        type: String,
        required: true,
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Exam', // Assuming you have an Exam model
    },
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
