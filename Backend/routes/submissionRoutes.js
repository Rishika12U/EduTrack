const express = require('express');
const router = express.Router();
const {
  submitQuiz,
  getAllSubmissions,
  getMySubmissions,
} = require('../controllers/submissionController');
const authMiddleware = require('../middleware/authMiddleware');

// Student: submit quiz
router.post('/submit', authMiddleware, submitQuiz);

// ✅ Student: view their own quiz submissions
router.get('/my', authMiddleware, getMySubmissions);

// Admin: view all submissions
router.get('/all', authMiddleware, getAllSubmissions);

module.exports = router;
