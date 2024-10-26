const express = require('express');
const { getAllStudents, deleteStudent, updateExamPermission } = require('../controllers/studentController');
const router = express.Router();

router.get('/', getAllStudents);
router.delete('/:id', deleteStudent);
router.put('/permission/:id', updateExamPermission);

module.exports = router;
