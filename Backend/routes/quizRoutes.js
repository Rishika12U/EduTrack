const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createQuiz, getQuizzesByTeacher } = require('../controllers/quizController');
const Quiz = require('../models/Quiz');

// 🔒 Private route for teachers to fetch their own quizzes
router.get('/my', authMiddleware, getQuizzesByTeacher);

// 🔒 Private route for teachers to create a quiz
router.post('/create', authMiddleware, createQuiz);

// 🌐 Public route: all quizzes (for students)
router.get('/all', async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quizzes' });
  }
});

module.exports = router;

