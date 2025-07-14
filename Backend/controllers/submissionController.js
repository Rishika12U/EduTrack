const Submission = require('../models/Submission');
const Quiz = require('../models/Quiz');

// Student submits quiz
exports.submitQuiz = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { quizId, answers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (q.correctAnswer === answers[i]) {
        score++;
      }
    });

    const newSubmission = new Submission({
      student: studentId,
      quiz: quizId,
      answers,
      score,
      submittedAt: new Date()
    });

    await newSubmission.save();
    res.status(201).json({ message: 'Quiz submitted', score });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting quiz', error: err.message });
  }
};

// Admin: Get all submissions with student and quiz title
exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate('student', 'name')
      .populate('quiz', 'title')
      .sort({ submittedAt: -1 });

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all submissions', error: err.message });
  }
};

// ✅ Student: Get their own submissions
exports.getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user.id })
      .populate('quiz', 'title questions')
      .sort({ submittedAt: -1 });

    res.json(submissions);
  } catch (err) {
    console.error('Error fetching student submissions:', err);
    res.status(500).json({ message: 'Error fetching your submissions' });
  }
};
