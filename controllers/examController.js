const Exam = require('../models/Exam');

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
    try {
        const exams = await Exam.find({ createdBy: req.user?.userId });
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exams', error });
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
