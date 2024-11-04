const express = require('express');
const { getAllStudents, deleteStudent, updateExamPermission, createActivity, getAllStudentActivities } = require('../controllers/studentController');
const authenticate = require('../middlewares/auth');
const router = express.Router();

router.get('/', getAllStudents);
router.delete('/:id', deleteStudent);
router.put('/permission/:id', updateExamPermission);

router.post('/activity', authenticate(), createActivity);
router.get('/activity', authenticate(), getAllStudentActivities);

module.exports = router;
