const Activity = require('../models/Activity');

// Log activity (Teacher)
exports.logActivity = async (req, res) => {
  try {
    const { activity } = req.body;
    const teacherId = req.user.id;

    const newActivity = new Activity({
      teacher: teacherId,
      activity,
      timestamp: new Date()
    });

    await newActivity.save();
    res.status(201).json({ message: 'Activity logged successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging activity', error: err.message });
  }
};

// Get activities of logged-in teacher
exports.getActivities = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const activities = await Activity.find({ teacher: teacherId }).sort({ timestamp: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching activities', error: err.message });
  }
};

// Admin: Get all activities with teacher name
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('teacher', 'name') // populate teacher name
      .sort({ timestamp: -1 });

    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all activities', error: err.message });
  }
};
