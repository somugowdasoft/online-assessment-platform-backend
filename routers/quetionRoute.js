const express = require('express');
const { addQuestion, getAllQuestions, getQuestionById, updateQuestion, deleteQuestion } = require('../controllers/questionController');

const router = express.Router();

// Route to add a new question
router.post('/add', addQuestion);

// Route to get all questions
router.get('/', getAllQuestions);

// Route to get a specific question by ID
router.get('/:id', getQuestionById);

// Route to update a question
router.put('/:id', updateQuestion);

// Route to delete a question
router.delete('/:id', deleteQuestion);

module.exports = router;
