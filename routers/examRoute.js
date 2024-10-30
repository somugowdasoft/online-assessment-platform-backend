const express = require('express');
const authenticate = require('../middlewares/auth');
const { createExam, getExams, deleteExam, updateExam, getExamById } = require('../controllers/examController');

const router = express.Router();

// Common routes
router.post('/exams', authenticate(), createExam);
router.get('/', authenticate(), getExams);
router.get('/exams/:id', authenticate(), getExamById);
router.put('/exams/:id', authenticate(), updateExam);
router.delete('/exams/:id', authenticate(), deleteExam);


module.exports = router;
