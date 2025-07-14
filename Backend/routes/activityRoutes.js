const express = require('express');
const router = express.Router();
const {
  logActivity,
  getActivities,
  getAllActivities
} = require('../controllers/activityController');
const authMiddleware = require('../middleware/authMiddleware');

// Teacher routes
router.post('/log', authMiddleware, logActivity);
router.get('/', authMiddleware, getActivities);

// Admin route
router.get('/all', authMiddleware, getAllActivities);

module.exports = router;
