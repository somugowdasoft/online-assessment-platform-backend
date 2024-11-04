const express = require('express');
const { getAllStudents, deleteStudent, updateExamPermission, createActivity, getAllStudentActivities } = require('../controllers/studentController');
const authenticate = require('../middlewares/auth');
const router = express.Router();

router.get('/', authenticate(), getAllStudents);
router.delete('/:id', authenticate(), deleteStudent);
router.put('/permission/:id', authenticate(), updateExamPermission);

router.post('/activity', authenticate(), createActivity);
router.get('/activity', authenticate(), getAllStudentActivities);

module.exports = router;
