const Exam = require('../models/Exam');
const Question = require('../models/Question');

exports.createExam = async (req, res) => {
    try {
        const exam = new Exam({ ...req.body, createdBy: req.user?.userId });
        await exam.save();
        res.status(201).json({ exam, message: 'Exam Created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating exam', error });
    }
};

// Get all exams
exports.getExams = async (req, res) => {
    const { userId, role } = req.user; // Extract userId and role from req.user
    let exams;

    try {
        if (role === "student") {
            // Students should get all exams
            exams = await Exam.find();
        } else if (role === "admin") {
            // Admins should get only the exams they created
            exams = await Exam.find({ createdBy: userId });
        } else {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        res.status(200).json(exams); // Send the exams data as JSON
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exams', error }); // Handle server errors
    }
};

// Get exam by ID
exports.getExamById = async (req, res) => {
    try {
        const { id } = req.params; // Get the exam ID from the request parameters
        // Find the exam by ID and populate the questions
        const exam = await Exam.findById(id);
        const questions = await Question.find({ examId: id });

        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        // Transform the data structure for better organization
        const formattedExam = {
            examDetails: {
                id: exam._id,
                name: exam.name,
                date: exam.date,
                duration: exam.duration,
                totalMarks: exam.totalMarks,
                totalQuestions: exam.totalQuestions,
                description: exam.description,
                createdBy: exam.createdBy
            },
            questions: questions.map((question, index) => ({
                questionNumber: index + 1,
                id: question._id,
                question: question.question,
                questionType: question.questionType,
                options: question.options,
                difficulty: question.difficulty,
                // Only include correctAnswer if needed (might want to exclude for student view)
                correctAnswer: question.correctAnswer
            })),
            metadata: {
                createdAt: exam.createdAt,
                updatedAt: exam.updatedAt
            }
        };

        res.status(200).json(formattedExam);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching exam', error });
    }
};

//update exam
exports.updateExam = async (req, res) => {
    try {
        const exam = await Exam.findOne({ _id: req.params.id, createdBy: req.user?.userId });
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        // Update the exam fields with the new data from the request body
        Object.assign(exam, req.body); // Use Object.assign to update fields
        await exam.save();
        res.status(200).json({ message: 'Exam updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating exam', error });
    }
};

//delete
exports.deleteExam = async (req, res) => {
    try {
        const exam = await Exam.findOne({ _id: req.params.id, createdBy: req.user?.userId });
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        await exam.deleteOne();
        res.status(200).json({ message: 'Exam deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting exam', error });
    }
};
