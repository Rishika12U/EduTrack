const Attendance = require('../models/Attendance');

// Mark attendance (Student/Teacher)
exports.markAttendance = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const userId = req.user.id;
    const role = req.user.role;
    const today = new Date().toISOString().split('T')[0];

    const alreadyMarked = await Attendance.findOne({ user: userId, date: today });
    if (alreadyMarked) {
      return res.status(400).json({ message: 'Attendance already marked today' });
    }

    const newAttendance = new Attendance({
      user: userId,
      role,
      date: today,
      location: {
        latitude,
        longitude
      }
    });

    await newAttendance.save();
    res.status(201).json({ message: 'Attendance marked' });
  } catch (err) {
    res.status(500).json({ message: 'Error marking attendance', error: err.message });
  }
};

// View own attendance
exports.getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ user: req.user.id }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching attendance', error: err.message });
  }
};

// Admin: View all attendance with user name
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate('user', 'name')
      .sort({ date: -1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all attendance', error: err.message });
  }
};
