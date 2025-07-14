const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getMyAttendance,
  getAllAttendance
} = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware');

// Student/Teacher routes
router.post('/mark', authMiddleware, markAttendance);
router.get('/my', authMiddleware, getMyAttendance);

// Admin route
router.get('/all', authMiddleware, getAllAttendance);

module.exports = router;
