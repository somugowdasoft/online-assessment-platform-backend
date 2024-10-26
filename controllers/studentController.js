const Student = require('../models/User');

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        let studentList = [];
        if (students) {
            studentList = students.filter(student => student?.role === "student");
        }
        res.status(200).json(studentList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete student
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update exam permission
exports.updateExamPermission = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        student.examPermission = req.body.examPermission;
        await student.save();

        res.status(200).json({ message: 'Permission updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
