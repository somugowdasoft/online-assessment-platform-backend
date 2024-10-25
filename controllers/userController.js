const User = require('../models/User');
const bcrypt = require('bcryptjs');
const createToken = require('../utils/tokenUtils')

// Register a new user (Student or Admin)
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json({ user: { name, email, role }, message: "user successfully registed" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Login user (Student or Admin)
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Invalid credentials' });
        const token = await createToken(user);
        res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role, id: user._id }, message: "user successfully login" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get user profile (Student or Admin)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update student profile
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(403).json({ error: 'User not found' });
        }
        Object.assign(user.profile, req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Admin: Get all students
exports.getAllStudents = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only admins can view all students' });
        }
        const students = await User.find({ role: 'student' }).select('-password');
        res.json(students);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Admin: Update student details
exports.updateStudent = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only admins can update student details' });
        }

        const student = await User.findById(req.params.id);
        if (!student || student.role !== 'student') {
            return res.status(404).json({ error: 'Student not found' });
        }

        Object.assign(student.profile.studentDetails, req.body);
        await student.save();
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
