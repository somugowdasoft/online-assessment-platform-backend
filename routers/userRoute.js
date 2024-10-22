const express = require('express');
const { registerUser, loginUser, getProfile, updateStudentProfile, getAllStudents, updateStudent } = require('../controllers/userController');
const authenticate = require('../middlewares/auth');

const router = express.Router();

// Common routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate(), getProfile);

// Student routes
router.put('/student/profile', authenticate('student'), updateStudentProfile);

// Admin routes
router.get('/admin/students', authenticate('admin'), getAllStudents);
router.put('/admin/student/:id', authenticate('admin'), updateStudent);

module.exports = router;
