const Student = require('../models/User');
const StudentActivity = require('../models/studentActivitySchema');

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


// Create or Update Student Activity
exports.createActivity = async (req, res) => {
    const { acivityType, examId, exam, userId } = req.body;

    try {
        // Find the student by ID from request parameters
        const student = await Student.findById(userId);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        // Create a new student activity or update an existing one
        const activityData = {
            studentId: student._id,
            examId: examId,
            exam: exam,
            name: student.name,
            email: student.email,
            acivityType: acivityType,
            examPermission: req.body.examPermission || false
        };

        // Save activity to the database
        const activity = new StudentActivity(activityData);
        await activity.save();

        res.status(201).json({ message: 'Student activity created successfully', activity });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all student activities (Admin)
exports.getAllStudentActivities = async (req, res) => {
    try {
        // Find all student activities in the database
        const activities = await StudentActivity.find()
            .populate('studentId', 'name email') // Populating only relevant fields from Student
            .exec();

        if (!activities || activities.length === 0) {
            return res.status(404).json({ message: 'No student activities found' });
        }

        res.status(200).json({ activities });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
