const express = require('express');
const authenticate = require('../middlewares/auth');
const { createExam, getExams, deleteExam, updateExam } = require('../controllers/examController');

const router = express.Router();

// Common routes
router.post('/exams', authenticate(), createExam);
router.get('/exams', authenticate(), getExams);
router.put('/exams/:id', authenticate(), updateExam);
router.delete('/exams/:id', authenticate(), deleteExam);


module.exports = router;
